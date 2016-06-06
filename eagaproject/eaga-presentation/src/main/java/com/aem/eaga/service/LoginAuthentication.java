package com.aem.eaga.service;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.SimpleCredentials;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.authentication.token.TokenCredentials;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.jackrabbit.value.StringValue;
import org.apache.sling.auth.core.AuthUtil;
import org.apache.sling.auth.core.spi.AuthenticationFeedbackHandler;
import org.apache.sling.auth.core.spi.AuthenticationHandler;
import org.apache.sling.auth.core.spi.AuthenticationInfo;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.aem.eaga.api.portal.customer.Customer;

import static  com.aem.eaga.api.portal.customer.impl.CustomerImpl.XTOKEN;

@Component
@Properties({ @Property(name = "service.ranking", intValue = 10000), @Property(name = "path", value = "/content") })
@Service
final public class LoginAuthentication implements AuthenticationHandler, AuthenticationFeedbackHandler {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    public static final String SERVER_NAME = "server_name";
    public static final String PASSWORD = "password";

    private static final String REQUEST_METHOD = "POST";
    private static final String ATTR_HOST_NAME_FROM_REQUEST = "";
    public static final String CQ_PROFILE = "profile";
    public static final String DEFAULT_VALUE = "fixValue";
    public static final String CQ_SECURITY_COMPONENTS_PROFILE_RESOURCE_TYPE = "cq/security/components/profile";
    public static final String PROFILE_NODE_NAME = "profile";
    public static final String FIRST_NAME = "first_name";
    public static final String LAST_NAME = "last_name";
    public static final String CUSTOMER_ID = "customer_id";
    private static final String CREDENTIALS = "user.jcr.credentials";
    private static final String TOKEN_ATTRIBUTE_NAME = ".token";
    private static final String J_USER_NAME = "j_username";
    private static final String J_PASSWORD = "j_password";
    private static final String AUTH_TYPE = "TOKEN";
    private static final String REQUEST_URL_SUFFIX = "j_security_check";
    private static final String CUG_ID_PROP_DEFAULT = "eagacug";
    private static final String CUG_ID_PROP_NAME = "eagacug.cug.groupid";

    @Property(label = "NS3 CUG group ADDRESS_ID",
              description = "Group userd in NS3 to access protected resources",
              name = CUG_ID_PROP_NAME,
              value = CUG_ID_PROP_DEFAULT)
    private String cugGroupId;

    @Reference(target = "(service.pid=com.day.crx.security.token.impl.impl.TokenAuthenticationHandler)")
    private AuthenticationHandler wrappedAuthHandler;

    @Reference
    protected SlingRepository slingRepository;

    @Reference
    protected Customer customer;

    private boolean wrappedIsAuthFeedbackHandler = false;

    @Activate
    protected void activate(final Map<String, String> config) {
    	logger.error("Alduzz mi Attivo");
        this.wrappedIsAuthFeedbackHandler = false;
        logger.error("Alduzz wrappedAuthHandler="+wrappedAuthHandler);
        if (wrappedAuthHandler != null) {
            logger.debug("Registered wrapped authentication feedback handler");
            this.wrappedIsAuthFeedbackHandler = wrappedAuthHandler instanceof AuthenticationFeedbackHandler;
        }
    }

    @Override
    public AuthenticationInfo
            extractCredentials(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        // Wrap the response object to capture any calls to sendRedirect(..) so it can be released in a controlled
        // manner later.
        final DeferredRedirectHttpServletResponse deferredRedirectResponse = new DeferredRedirectHttpServletResponse(httpServletRequest,
        		                                                                                                          httpServletResponse);
        final String username = httpServletRequest.getParameter(J_USER_NAME);
        final String password = httpServletRequest.getParameter(J_PASSWORD);
        logger.error("Alduzz username="+username);  
        logger.error("Alduzz password="+password);  
        if (REQUEST_METHOD.equals(httpServletRequest.getMethod())
            && httpServletRequest.getRequestURI().endsWith(REQUEST_URL_SUFFIX) && username != null) {

            if (!AuthUtil.isValidateRequest(httpServletRequest)) {
                AuthUtil.setLoginResourceAttribute(httpServletRequest, httpServletRequest.getContextPath());
            }
            logger.error("AFTER RETRIEVE TOKEN");
            String token =  customer.getToken(username, password);
            logger.error("TOKEN RETRIEVED: "+ token);
            if (token != null && !token.isEmpty()) {
                SimpleCredentials creds = new SimpleCredentials(username, password.toCharArray());
                creds.setAttribute(ATTR_HOST_NAME_FROM_REQUEST, httpServletRequest.getServerName());
                /*
                * Call Web Service
                */
                final Map<String, String> authenticationInfo = customer.getCustomer(token, username, password);
                /*
                * Set the cookie
                */
                setCookie(httpServletResponse, token);

                return retrieveAuthenticationInfo(httpServletRequest, authenticationInfo);
            }
            logger.debug("AUTHENTICATION FAILED!!!!!!!!!");
            return AuthenticationInfo.FAIL_AUTH;
        }
        logger.debug("AUTHENTICATION METHOD:");
        return wrappedAuthHandler.extractCredentials(httpServletRequest, deferredRedirectResponse);
    }

    private AuthenticationInfo
            retrieveAuthenticationInfo(final HttpServletRequest request, final Map<String, String> credentialMap) {

        Session adminSession = null;
        Session impersonatedSession = null;

        final String customerId = credentialMap.get("contactID");
        logger.error("Alduzz contactID="+customerId);
        try {
            adminSession = slingRepository.loginAdministrative(null);
            JackrabbitSession jackrabbitSession = (JackrabbitSession) adminSession;
            UserManager userManager = jackrabbitSession.getUserManager();

            cugGroupId = CUG_ID_PROP_DEFAULT;
            addCUGMember(customerId, credentialMap, userManager, jackrabbitSession, cugGroupId);

            final SimpleCredentials credentials = new SimpleCredentials(customerId,
                                                                        encryptPassword(credentialMap.get(PASSWORD))
                                                                                .toCharArray());
            credentials.setAttribute(SERVER_NAME, request.getServerName());
            credentials.setAttribute(TOKEN_ATTRIBUTE_NAME, "");
            impersonatedSession = adminSession.impersonate(credentials);
            final TokenCredentials tokenCredentials = new TokenCredentials((String) credentials
                    .getAttribute(TOKEN_ATTRIBUTE_NAME));
            final AuthenticationInfo authenticationInfo = new AuthenticationInfo(AUTH_TYPE, customerId);
            authenticationInfo.put(CREDENTIALS, tokenCredentials);

            if (credentialMap.get(FIRST_NAME) != null && credentialMap.get(LAST_NAME) != null) {
                authenticationInfo.put(FIRST_NAME, credentialMap.get(FIRST_NAME));
                authenticationInfo.put(LAST_NAME, credentialMap.get(LAST_NAME));
            }

            authenticationInfo.put(CUSTOMER_ID, credentialMap.get(CUSTOMER_ID));

            return authenticationInfo;

        } catch (final IllegalStateException e) {
            logger.error("Error during authentication. Can not add user to the group {} ", cugGroupId, e);
            return AuthenticationInfo.FAIL_AUTH;
        } catch (final RepositoryException e) {
            logger.error("Error during authentication ", e);
            return AuthenticationInfo.FAIL_AUTH;
        } finally {
            if (adminSession != null) {
                saveSession(adminSession);
                adminSession.logout();
            }
            if (impersonatedSession != null) {
                impersonatedSession.logout();
            }
        }
    }

    public String encryptPassword(String message) {
        try {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(message.getBytes());
            return String.format("%032x", new BigInteger(1, m.digest()));
        } catch (Exception e) {
            return null;
        }
    }

    private void saveSession(Session adminSession) {
        try {
            adminSession.save();
        } catch (RepositoryException e) {
            logger.error("Could not save user to JCR, aborting.. ", e);
            throw new RuntimeException(e);
        }
    }

    protected void addCUGMember(
        String username,
        Map<String, String> authenticationInfo,
        UserManager userManager,
        JackrabbitSession session,
        String cugGroupId) throws RepositoryException {

        User user = createOrUpdateUser(authenticationInfo, username, userManager, session);

        Group cugGroup = (Group) userManager.getAuthorizable(cugGroupId);
        if (cugGroup == null) {
            throw new IllegalStateException("CUG group does not exist");
        }
        if (!cugGroup.isMember(user)) {
            cugGroup.addMember(user);
        }

    }

    private User createOrUpdateUser(
        Map<String, String> authenticationInfo,
        String username,
        UserManager userManager,
        JackrabbitSession session) throws RepositoryException {

        User user = null;
        Authorizable authorizable = userManager.getAuthorizable(username);
        final StringValue authenticationUsername = new StringValue(authenticationInfo.get("contactID"));
        if (authorizable != null && !authorizable.isGroup()) {
            user = (User) authorizable;
            user.setProperty(PROFILE_NODE_NAME + "/username", authenticationUsername);
            user.setProperty(PROFILE_NODE_NAME + "/email", authenticationUsername);
        }

        if (user == null) {
            user = userManager.createUser(username, authenticationInfo.get(PASSWORD));
            user.setProperty(PROFILE_NODE_NAME + "/sling:resourceType",
                             new StringValue(CQ_SECURITY_COMPONENTS_PROFILE_RESOURCE_TYPE));
            user.setProperty(CQ_PROFILE + "/default", new StringValue(DEFAULT_VALUE));
            user.setProperty(CQ_PROFILE + "/sling:resourceType",
                             new StringValue(CQ_SECURITY_COMPONENTS_PROFILE_RESOURCE_TYPE));
            user.setProperty(PROFILE_NODE_NAME + "/email", authenticationUsername);
            user.setProperty(PROFILE_NODE_NAME + "/username", authenticationUsername);
        }

        if (!userManager.isAutoSave()) {
            session.save();
        }

        return user;
    }

    public void setCookie(HttpServletResponse httpServletResponse, String token) {
        /*
         * Set cookie
         */
        Cookie cookie = new Cookie(XTOKEN, token);
        cookie.setValue(token);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);
        cookie.setComment("Test vodafone cookie");
        httpServletResponse.addCookie(cookie);
    }

    @Override
    public boolean requestCredentials(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
        throws IOException {
        return wrappedAuthHandler.requestCredentials(httpServletRequest, httpServletResponse);
    }

    @Override
    public void dropCredentials(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
        throws IOException {
        wrappedAuthHandler.dropCredentials(httpServletRequest, httpServletResponse);
    }

    @Override
    public void authenticationFailed(
        HttpServletRequest httpServletRequest,
        HttpServletResponse httpServletResponse,
        AuthenticationInfo authenticationInfo) {
        // Wrap the response so we can release any previously deferred redirects
        final DeferredRedirectHttpServletResponse deferredRedirectResponse = new DeferredRedirectHttpServletResponse(httpServletRequest,
                                                                                                                     httpServletResponse);

        if (this.wrappedIsAuthFeedbackHandler) {
            ((AuthenticationFeedbackHandler) wrappedAuthHandler)
                    .authenticationFailed(httpServletRequest, deferredRedirectResponse, authenticationInfo);
        }

        try {
            deferredRedirectResponse.releaseRedirect();
        } catch (IOException e) {
            logger.error("Could not release redirect", e);
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public boolean authenticationSucceeded(
        HttpServletRequest httpServletRequest,
        HttpServletResponse httpServletResponse,
        AuthenticationInfo authenticationInfo) {
        boolean result = false;

        // Wrap the response so we can release any previously deferred redirects
        final DeferredRedirectHttpServletResponse deferredRedirectResponse = new DeferredRedirectHttpServletResponse(httpServletRequest,
                                                                                                                     httpServletResponse);

        if (this.wrappedIsAuthFeedbackHandler) {
            result = ((AuthenticationFeedbackHandler) wrappedAuthHandler)
                    .authenticationSucceeded(httpServletRequest, httpServletResponse, authenticationInfo);
        }

        try {
            deferredRedirectResponse.releaseRedirect();
        } catch (IOException e) {
            logger.error("Could not release redirect", e);
            httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    /**
     * It is not uncommon (Example: OOTB SAML Authentication Handler) for response.sendRedirect(..) to be called
     * in extractCredentials(..). When sendRedirect(..) is called, the response immediately flushes causing the browser
     * to redirect.
     */
    private class DeferredRedirectHttpServletResponse extends HttpServletResponseWrapper {

        private String ATTR_KEY = DeferredRedirectHttpServletResponse.class.getName() + "_redirectLocation";

        private HttpServletRequest request = null;

        public DeferredRedirectHttpServletResponse(final HttpServletRequest request,
                                                   final HttpServletResponse response) {
            super(response);
            this.request = request;
        }

        /**
         * This method captures the redirect request and stores it to the Request so it can be leveraged later.
         * @param location the location to redirect to
         */
        @Override
        public void sendRedirect(String location) {
            // Capture the sendRedirect location, and hold onto it so it can be released later (via releaseRedirect())
            this.request.setAttribute(ATTR_KEY, location);
        }

        /**
         * Invokes super.sendRedirect(..) with the value captured in this.sendRedirect(..)
         * @throws IOException
         */
        public final void releaseRedirect() throws IOException {
            final String location = (String) this.request.getAttribute(ATTR_KEY);

            if (location != null) {
                super.sendRedirect(location);
            }
        }
    }
}
