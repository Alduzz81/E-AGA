package com.aem.eaga.sightly.homeproduct;

public class HomeProductItem {
	private String image;
	private String imageAlt;
	private String imageHref;
	private String name;
	
	public HomeProductItem(String image, String imageHref, String imageAlt, String name) {
	    this.image = image;
	    this.imageHref = imageHref;
	    this.imageAlt = imageAlt;
	    this.name = name;
	}

	public String getImage() {
		return image;
	}
	
	public void setImage(String image) {
        this.image = image;
    }
	
	public String getImageAlt() {
		return imageAlt;
	}
	
	public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }
	
	public String getImageHref() {
		return imageHref;
	}
	
	public void setImageHref(String imageHref) {
        this.imageHref = imageHref;
    }
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
        this.name = name;
    }
}
