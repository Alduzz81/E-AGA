package com.aem.eaga;

import com.adobe.granite.xss.XSSAPI;
import com.day.cq.personalization.UserPropertiesUtil;
import com.day.cq.wcm.api.LanguageManager;
import com.day.cq.wcm.api.WCMMode;
import com.aem.eaga.common.CommonUse;
import com.aem.eaga.request.RequestWrapper;
import com.aem.eaga.request.RequestWrapperFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.google.common.base.Preconditions.checkArgument;

public class Context {

    private final SlingHttpServletRequest request;
    private final LanguageManager languageManager;
    private RequestWrapper requestWrapper;
    private XSSAPI xssApi;
    private static final Logger logger = LoggerFactory.getLogger(Context.class);
    
    public Context(SlingHttpServletRequest request, SlingHttpServletResponse response, LanguageManager languageManager) {
    	logger.error("dentro a costruttore di Context");
        checkArgument(request != null);
        checkArgument(response != null);

        if(request ==  null){
    		logger.error("request null");
    	} else {
    		logger.error("request NON null");
    	}
        
        if(response ==  null){
    		logger.error("response null");
    	} else {
    		logger.error("response NON null");
    	}
        
        if(languageManager ==  null){
    		logger.error("languageManager null");
    	} else {
    		logger.error("languageManager NON null");
    	}
        
        this.languageManager = languageManager;
        this.request = request;
        this.requestWrapper = RequestWrapperFactory.createRequestWrapper(request, response);
        
        if(requestWrapper ==  null){
    		logger.error("requestWrapper null");
    	} else {
    		logger.error("requestWrapper NON null");
    	}

        this.xssApi = requestWrapper.getResourceResolver().adaptTo(XSSAPI.class);
        
        if(xssApi ==  null){
    		logger.error("xssApi null");
    	} else {
    		logger.error("xssApi NON null");
    	}
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
