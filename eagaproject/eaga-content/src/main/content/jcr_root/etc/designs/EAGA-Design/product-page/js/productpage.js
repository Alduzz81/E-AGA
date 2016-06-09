/*******************************************************************************
 * START PRODUCT PAGE
 ******************************************************************************/



/*******************************************************************************
 * END PRODUCT PAGE
 ******************************************************************************/


$(document).ready(function () {
	
	if($(document).find("title").text() == "Product"){
		var pathForFrontImg = $(".img-column-item").first().attr("src");
		$(".front-img").attr("src", pathForFrontImg);
		var pathForFrontLargeImg = pathForFrontImg.replace("icons", "large");
		$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
		$(".img-column-item").first().addClass("img-shadow");
	}	
	
		$(".img-column-item").click(function(){
			$(".img-column-item").removeClass("img-shadow");
			$(this).addClass("img-shadow");
			var pathForFrontImg = $(this).attr("src");
			$(".front-img").attr("src", pathForFrontImg);
			
			var zoomWindowStyle = $(".zoomWindow").attr("style");
			var zoomWindowStyleBegin = zoomWindowStyle.substr(0, zoomWindowStyle.indexOf('"/')+1);
			var zoomWindowStyleEnd = zoomWindowStyle.substr(zoomWindowStyle.indexOf('");'));
			var pathForFrontLargeImg = pathForFrontImg.replace("/icons/", "/large/");
			zoomWindowStyle = zoomWindowStyleBegin + pathForFrontLargeImg + zoomWindowStyleEnd;
			$(".zoomWindow").attr("style", zoomWindowStyle);
			$(".front-img").attr("data-zoom-image", pathForFrontLargeImg);
		});
	
	$(".front-img").elevateZoom({zoomWindowPosition: 1, zoomWindowOffetx: 20, zoomWindowHeight: 500, zoomWindowWidth:500, scrollZoom : true});
	
});
