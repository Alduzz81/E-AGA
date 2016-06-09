<%@page session="false"%><%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.


@deprecated. Use json load.json instead. XSS non property supported.

--%><%@ page import="com.adobe.granite.security.user.UserProperties,
                    com.adobe.granite.security.user.UserPropertiesManager,
                    com.adobe.granite.security.user.UserManagementService,
                    com.adobe.cq.social.ugcbase.SocialUtils,
                    com.adobe.cq.social.ugcbase.core.SocialResourceUtils,
                    com.day.cq.commons.Externalizer,
                    com.day.cq.xss.ProtectionContext,
                    com.day.cq.xss.XSSProtectionService,
                    org.apache.sling.commons.json.JSONException,
                    java.util.Date,
                    javax.jcr.RepositoryException,
                    com.aem.aega.api.portal.customer.Customer" %><%!
%><%@include file="/libs/foundation/global.jsp" %><%

    UserManagementService userManagementService = sling.getService(UserManagementService.class);
    Customer customer = sling.getService(Customer.class);
    String anonymousId = (userManagementService != null) ? userManagementService.getAnonymousId() : "anonymous";

    String authorizableId = request.getParameter("authorizableId");
    final UserPropertiesManager upm = resourceResolver.adaptTo(UserPropertiesManager.class);
    XSSProtectionService xss = sling.getService(XSSProtectionService.class);

    //anonymous - special case
    UserProperties userProperties = null;
    if( !anonymousId.equals(authorizableId)) {
        if (authorizableId != null) {
            try {

                userProperties = upm.getUserProperties(authorizableId, "profile");
            } catch (RepositoryException e) {
                slingResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED, "");
            }
        } else {
            userProperties = upm.getUserProperties(resourceResolver.getUserID(), "profile");
        }
        if (userProperties != null) {
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('avatar','" +
                    SocialResourceUtils.getAvatar(userProperties, SocialUtils.DEFAULT_AVATAR, SocialUtils.AVATAR_SIZE.THIRTY_TWO) + "');");

            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('usageAllowance','" +
                    customer.getServiceBalance(authorizableId) + "');");
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('serviceAccount','" +
                    customer.getCustomerServiceAccount(authorizableId) + "');");
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('customerBill','" +
                    customer.getCustomerBill(authorizableId) + "');");
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('customerParty','" +
                    customer.getCustomerParty(authorizableId) + "');");

            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('authorizableId','" +
                    xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,userProperties.getAuthorizableID()) + "');");
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('path','" + userProperties.getNode().getPath() + "');");
            out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('formattedName','" +
                    xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,userProperties.getDisplayName()) + "');");
            for (String key : userProperties.getPropertyNames()) {
                if (!key.startsWith("jcr:") &&
                        !key.startsWith("sling:") &&
                        !key.startsWith("cq:last") &&
                        !key.startsWith("memberSince") &&
                        !key.startsWith("birthday")) {
                    Object o = userProperties.getProperty(key);
                    if (o != null && o instanceof String) {
                        String v = o.toString().replaceAll("'","\\\\'");
                        out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('" + key + "','" +
                                xss.protectForContext(ProtectionContext.PLAIN_HTML_CONTENT,v) + "');");
                    }
                }
            }

            Date created = userProperties.getProperty("memberSince", null, Date.class);
            if( created == null) {
                try {
                    created = userProperties.getNode().getProperty("jcr:created").getDate().getTime();
                } catch (PathNotFoundException e) {
                    // no created date set
                }
            }
            if( created != null ) {
                java.text.DateFormat df = com.day.cq.commons.date.DateUtil.getDateFormat("d MMM yyyy h:mm a", slingRequest.getLocale());
                out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('memberSince','" + df.format(created) + "');");
            }

            Date birthday = userProperties.getProperty("birthday", null, Date.class);
            if( birthday != null ) {
                java.text.DateFormat df = com.day.cq.commons.date.DateUtil.getDateFormat("d MMM yyyy", slingRequest.getLocale());
                out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('birthday','" + df.format(birthday) + "');");
            }
        }
    } else {
        Externalizer externalizer = sling.getService(Externalizer.class);

        String anonymousPath = "";
        org.apache.jackrabbit.api.security.user.Authorizable anonymous =
                resourceResolver.adaptTo(org.apache.jackrabbit.api.security.user.UserManager.class).getAuthorizable(anonymousId);
        if (anonymous != null) {
            anonymousPath = anonymous.getPath();
        }

        String absoluteDefaultAvatar = "";
        if(externalizer != null){
            absoluteDefaultAvatar = externalizer.relativeLink(slingRequest, SocialUtils.DEFAULT_AVATAR);
        }

        out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('authorizableId','"+ anonymousId +"');");
        out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('formattedName', CQ.I18n.getMessage('Anonymous Surfer'));");
        out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('path','" + anonymousPath + "');");
        out.println("CQ_Analytics.ProfileDataMgr.addInitProperty('avatar','" + absoluteDefaultAvatar + "');");
    }
%>