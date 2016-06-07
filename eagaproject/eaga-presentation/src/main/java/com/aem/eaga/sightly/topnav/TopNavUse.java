package com.aem.eaga.sightly.topnav;

import javax.jcr.Node;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import com.aem.eaga.common.CommonUse;
import com.aem.eaga.common.CommonUtility;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TopNavUse extends CommonUse {
	
	private static final Logger LOG = LoggerFactory.getLogger(TopNavUse.class);
	private Page currentPage, rootPage;
	private List<Page> childPages;
	private Iterator<Page> children;
	private final List<TopNavItem> pages = new LinkedList<TopNavItem>();
	
	@Override
	public void activate() throws Exception {
		LOG.info("====================== Top Navigation Activate Start ======================");
		
		currentPage = get("currentPage", Page.class);
		rootPage = currentPage.getAbsoluteParent(1);
		if (rootPage != null) {
	       // final boolean showSiteTitle = !currentStyle.get("hideSiteTitle", false);
	        final String rootPath = rootPage.getPath() + ".html";
	        
	        childPages = new ArrayList<Page>();
	        children = rootPage.listChildren(new PageFilter());
	        while(children.hasNext()) {
	            childPages.add(children.next());
	        }
	        
	        String extraClasses = "";
	        if (childPages.size() > 7) {
	            extraClasses = "large";
	        }
	        setPages(childPages);
		}
        LOG.info("CURRENT PAGE "+ currentPage);
		LOG.info("====================== Top Navigation Activate End ======================");
	}
	
	private void setPages(List<Page> childPages){
		int item = 1;
		TopNavItem page;
        for (Page child : childPages) {
            String className = "topnav-item-"+item;
            if (item == 1) className += " topnav-first";
            if (!children.hasNext()) className += " topnav-last";
            page = new TopNavItem(child.getPath() + ".html",child.getTitle(), className);
            pages.add(page);
            item++;
        }
	}
	
    public List<TopNavItem> getTopNavItems() {
        return pages;
    }
}
