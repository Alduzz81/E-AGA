package com.aem.eaga.common;

import com.adobe.cq.sightly.SightlyWCMMode;
import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.personalization.ClientContextUtil;
import com.day.cq.wcm.api.LanguageManager;

import com.aem.eaga.request.RequestWrapper;
import com.aem.eaga.Context;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Calendar;
 
public class CommonUse extends WCMUsePojo {

    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private static final String PATHVIDEORENDITION = "jcr:content/renditions/cq5dam.video";
    private static final String PATHIMAGERENDITION = "jcr:content/renditions/cq5dam.thumbnail";
    private static final String PATHWEBRENDITION = "jcr:content/renditions/cq5dam.web";
    private static final String VIDEO_THUMBNAIL_EXTENSION = ".png";
    private static final String VIDEO_THUMBNAIL_SMALL = "48.48";
    private static final String VIDEO_THUMBNAIL_MEDIUM = "140.100";
    private static final String VIDEO_THUMBNAIL_BIG = "319.319";
    private static final String VIDEO_RENDITION_FLV = "flv.320.240.flv";
    private static final String VIDEO_RENDITION_OGG = "firefoxhq.ogg";
    private static final String VIDEO_RENDITION_M4V = "hq.m4v";
    private static final String VIDEO_RENDITION_MP4 = "iehq.mp4";

    protected Context context;
    private static final Logger logger = LoggerFactory.getLogger(CommonUse.class);
    static int ID = 0;
    
    @Override
    public void activate() throws Exception {
    	int id = ++ID;
        LanguageManager languageManager = getService(LanguageManager.class);
        
        if(languageManager ==  null){
    		logger.error("languageManager null " + id);
    	} else {
    		logger.error("languageManager NON null " + id);
    	}
        
        SlingHttpServletRequest request = getRequest();
        
        if(request ==  null){
    		logger.error("request null " + id);
    	} else {
    		logger.error("request NON null " + id);
    	}
        
        context = getContextInstance(request, getResponse(), languageManager); 
        
        if(context ==  null){
    		logger.error("context null " + id);
    	} else {
    		logger.error("context NON null in activate " + id);
    	}
        
        LOG.debug("CommonUse class activated " + id);
    }

    public String getValidLink(String link) {
        if (null != link) {
            if (link.isEmpty() || ("#").equals(link)) {
                return "#";
            }
            Resource resource = getResourceResolver().getResource(link);
            return (null == resource) ? link : link + ".html";
        }
        return "#";
    }

    public Resource getResourceFromPath(String path) {
        if (path != null && !path.isEmpty()) {
            return getResourceResolver().getResource(path);
        }
        return null;
    }

    public boolean isAuthor() {
        SightlyWCMMode wcmMode = getWcmMode();
        return wcmMode.isEdit() || wcmMode.isDesign();
    }

    /**
     * To use with the components that must be visible for logged users only.
     * The component is always visible in author mode, while it is visible in
     * publish mode only if not anonymous.
     * Note: it only works on component's activation, i.e. when the page is loaded.
     * Not suitable for asynchronous changes like the login mechanism.
     *
     * @return true if component is visible, false otherwise
     */
    
    public static String getPathWebRendition() {
        return PATHWEBRENDITION;
    }

    public static String getPathImageRendition() {
        return PATHIMAGERENDITION;
    }

    public static String getPathVideoRendition() {
        return PATHVIDEORENDITION;
    }

    public static String getVideoThumbnailExtension() {
        return VIDEO_THUMBNAIL_EXTENSION;
    }

    public static String getVideoThumbnailSmall() {
        return VIDEO_THUMBNAIL_SMALL;
    }

    public static String getVideoThumbnailMedium() {
        return VIDEO_THUMBNAIL_MEDIUM;
    }

    public static String getVideoThumbnailBig() {
        return VIDEO_THUMBNAIL_BIG;
    }

    public static String getVideoRenditionFlv() {
        return VIDEO_RENDITION_FLV;
    }

    public static String getVideoRenditionOgg() {
        return VIDEO_RENDITION_OGG;
    }

    public static String getVideoRenditionM4v() {
        return VIDEO_RENDITION_M4V;
    }

    public static String getVideoRenditionMp4() {
        return VIDEO_RENDITION_MP4;
    }

    /*
     * Deal with the actual behavior of the Vodafone DAM Update Asset, that
     * creates .jpeg renditions even if the file ends in .jpg
     */
    public static String getMediaExtension(String fileExtension) {
        return (".jpg").equalsIgnoreCase(fileExtension) ? ".jpeg" : fileExtension;
    }

    public int getCurrentYear() {
        return Calendar.getInstance().get(Calendar.YEAR);
    }

    public final <T> T getService(Class<T> serviceInterfaceClass) {
        return getSlingScriptHelper().getService(serviceInterfaceClass);
    }
 
    private static Context getContextInstance(SlingHttpServletRequest request, SlingHttpServletResponse response,
            LanguageManager languageManager) {
        return new Context(request, response, languageManager);
    }
    
    public String getId() {
    	logger.error("dentro a getID " + ID);
    	
    	if(context ==  null){
    		logger.error("context null");
    	} else {
    		logger.error("context NON null");
    	}
        RequestWrapper wrapper = context.getRequestWrapper();
        if(wrapper ==  null){
    		logger.error("wrapper null");
    	} else {
    		logger.error("wrapper NON null");
    	}
        Resource res = wrapper.getResource();
        if(res ==  null){
    		logger.error("res null");
    	} else {
    		logger.error("res NON null");
    	}
        String path = res.getPath();
        if(path ==  null){
    		logger.error("path null");
    	} else {
    		logger.error("path NON null");
    	}
        return ClientContextUtil.getId(path);
        //return ClientContextUtil.getId(context.getRequestWrapper().getResource().getPath());
    }
}
