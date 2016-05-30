package com.aem.eaga;

import com.adobe.granite.xss.XSSAPI;
import com.day.cq.personalization.UserPropertiesUtil;
import com.day.cq.wcm.api.LanguageManager;
import com.day.cq.wcm.api.WCMMode;

 
import com.aem.eaga.request.RequestWrapper;
import com.aem.eaga.request.RequestWrapperFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;

import static com.google.common.base.Preconditions.checkArgument;

public class Context {

    private final SlingHttpServletRequest request;
    private final LanguageManager languageManager;
     
    private RequestWrapper requestWrapper;
    private XSSAPI xssApi;

    public Context(SlingHttpServletRequest request, SlingHttpServletResponse response, LanguageManager languageManager ) {

        checkArgument(request != null);
        checkArgument(response != null);

        this.languageManager = languageManager;
         
        this.request = request;
        this.requestWrapper = RequestWrapperFactory.createRequestWrapper(request, response);

        this.xssApi = requestWrapper.getResourceResolver().adaptTo(XSSAPI.class);
    }

    public RequestWrapper getRequestWrapper() {
        return requestWrapper;
    }

    public SlingHttpServletResponse getSlingResponse() {
        return requestWrapper.getSlingResponse();
    }

    public SlingHttpServletRequest getSlingRequest() {
        return requestWrapper.getSlingRequest();
    }

    public boolean isAuthenticated() {
        return !UserPropertiesUtil.isAnonymous(getSlingRequest());
    }

    public boolean isWCMModeEnabled() {
        return WCMMode.DISABLED != WCMMode.fromRequest(requestWrapper.getSlingRequest());
    }

    public XSSAPI getXssApi() {
        return xssApi;
    }
 
}
