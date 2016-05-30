package com.aem.eaga.request;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;

public class RequestWrapperFactory {

    public static RequestWrapper createRequestWrapper(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        return new RequestWrapper(request, response);
    }

}
