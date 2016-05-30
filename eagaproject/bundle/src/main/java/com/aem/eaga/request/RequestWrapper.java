package com.aem.eaga.request;

import com.day.cq.commons.Externalizer;
import com.day.cq.search.QueryBuilder;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.designer.Design;
import com.day.cq.wcm.api.designer.Designer;
import com.day.cq.wcm.api.designer.Style;
import com.day.cq.wcm.commons.WCMUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.adapter.Adaptable;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;

import javax.jcr.Session;

import static com.google.common.base.Preconditions.checkArgument;
import static org.apache.sling.api.resource.ResourceUtil.getValueMap;

public class RequestWrapper implements Adaptable {
    private final SlingHttpServletRequest request;
    private final SlingHttpServletResponse response;
    private final Resource resource;
    private final ResourceResolver resourceResolver;
    //private SitePath sitePath;

    RequestWrapper(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        checkArgument(request != null);
        checkArgument(response != null);
        this.request = request;
        this.response = response;
        this.resource = request.getResource();
        this.resourceResolver = request.getResourceResolver();
    }

    public SlingHttpServletResponse getSlingResponse() {
        return response;
    }

    public SlingHttpServletRequest getSlingRequest() {
        return request;
    }



    public ValueMap getProperties() {
        return getValueMap(resource);
    }

    public Resource getResource() {
        return resource;
    }

    public Resource getOtherResourceAtPath(String path) {
        return resourceResolver.getResource(path);
    }

    public ResourceResolver getResourceResolver() {
        return request.getResourceResolver();
    }

    public PageManager getPageManager() {
        return resourceResolver.adaptTo(PageManager.class);
    }

    public Session getSession() {
        return resourceResolver.adaptTo(Session.class);
    }

    public QueryBuilder getQueryBuilder() {
        return resourceResolver.adaptTo(QueryBuilder.class);
    }

    public ValueMap getPageProperties() {
        Page currentPage = getCurrentPage();
        if (currentPage == null) {
            return ValueMap.EMPTY;
        }
        return currentPage.getProperties();
    }

    public Page getCurrentPage() {
        return getPageManager().getContainingPage(getResource());
    }

    public Designer getDesigner() {
        return resourceResolver.adaptTo(Designer.class);
    }

    public Style getCurrentStyle() {
        Design currentDesign = getCurrentDesign();
        com.day.cq.wcm.api.components.ComponentContext cqComponentContext = WCMUtils.getComponentContext(getSlingRequest());
        if (currentDesign == null || cqComponentContext == null) {
            return null;
        }

        return currentDesign.getStyle(cqComponentContext.getCell());
    }

    public Design getCurrentDesign() {
        return getDesigner().getDesign(getCurrentPage());
    }

    public Resource getChildResource(String relPath) {
        return resource.getChild(relPath);
    }

    public <T> T getProperty(String name, T defaultValue) {
        return Resources.getInheritedProperty(getResource(), name, defaultValue);
    }

    public <T> T getProperty(String name, Class<T> clazz) {
        return Resources.getInheritedProperty(getResource(), name, clazz);
    }

    /*public SitePath getSitePath() throws NoSiteInformationInPathException {
        if (sitePath == null) {
            final String path = getResource().getPath();
            sitePath = SitePathBuilder.siteNameAndReferenceFromPath(path).appendPath(path);
        }
        return sitePath;
    }*/

    public String getParameter(String name) {
        return request.getParameter(name);
    }

    //@Override
    public <AdapterType> AdapterType adaptTo(Class<AdapterType> type) {
        return request.adaptTo(type);
    }

    public Externalizer getExternalizer() {
        return getResourceResolver().adaptTo(Externalizer.class);
    }
}
