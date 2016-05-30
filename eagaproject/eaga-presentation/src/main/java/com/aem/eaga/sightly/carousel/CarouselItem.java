package com.aem.eaga.sightly.carousel;

public class CarouselItem {
	private String image;
	private String imageAlt;
	private String imageHref;
	private String msg;
	
	public CarouselItem(String image, String imageHref, String imageAlt, String msg) {
	    this.image = image;
	    this.imageHref = imageHref;
	    this.imageAlt = imageAlt;
	    this.msg = msg;
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
	
	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
        this.msg = msg;
    }
}
