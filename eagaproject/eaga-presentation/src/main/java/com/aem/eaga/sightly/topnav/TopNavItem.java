package com.aem.eaga.sightly.topnav;

public class TopNavItem {
	private String pagePath;
	private String pageTitle;
	private String pageClassname;

	
	public TopNavItem(String pagePath, String pageTitle, String pageClassname){
		this.pagePath = pagePath;
		this.pageTitle = pageTitle;
		this.pageClassname = pageClassname;
	}
	
	public String getPagePath() {
		return pagePath;
	}
	
	public void setPagePath(String pagePath) {
        this.pagePath = pagePath;
    }
	
	public String getPageTitle() {
		return pageTitle;
	}
	
	public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }
	
	public String getPageClassname() {
		return pageClassname;
	}
	
	public void setPageClassname(String pageClassname) {
        this.pageClassname = pageClassname;
    }
}
