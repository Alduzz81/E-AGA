/*******************************************************************************
 * START SLIDER HOME PROD
 ******************************************************************************/

function initSliderHomeProd () {

    var numSlideShow = 3;
    var numSlideShowTablet = 2;
    var numSlideShowMobile = 1;
    var numSlide = $('.slider-wrap-prod .cta-slider-wrap .cta-slider-single').length;
    var numSlideToShow = 5;

    switch (numSlide) {
    case 1:
        numSlideShow = 3;
        $('.slider-wrap-prod .control-wrap-prod').addClass('hide');
        break;
    case 2:
        numSlideShow = 1;
        numSlideShowTablet = 1;
        $('.slider-wrap-prod .container-fluid').addClass('two-slide');
        break;
    case 3:
        numSlideShow = 1;
        numSlideShowTablet = 1;
        $('.slider-wrap-prod .container-fluid').addClass('three-slide');
        break;
    default:
        numSlideShow = 3;
        break;
    }
    $('.slider-wrap-prod .image-slider-wrap-prod').slick({
        slidesToShow: numSlideToShow,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        arrows: true,
        appendArrows: $('.arrows-prod'),
        lazyLoad: 'ondemand',
        pauseOnHover: true,
        dots: true,
        appendDots: $('.control-wrap-prod .dots-wrap-prod'),
        autoplay: true,
        autoplaySpeed: $('.slider-wrap-prod').attr('data-time-autoplay')
    });
}

eagaApp.controller("HomeProductController", ['$scope', '$window', function($scope,$window) {
	
	$scope.goToSingleProductPageById = function(idProduct){
	
		//probabilmente bisogna settare anche l'utente per evitare conflitti
		console.log("id product: "+ idProduct);
		setCookie("singleIdProduct", idProduct, 1);
		window.location.href = '/content/eaga/product.html';

	}
}]);


/*******************************************************************************
 * END SLIDER HOME PROD
 ******************************************************************************/


$(document).ready(function () {
	initSliderHomeProd ();
	
	$('.arrows-prod .slick-prev').html("<span class='prev-arr'>❮</span>");
	$('.arrows-prod .slick-next').html("<span class='next-arr'>❯</span>");
	
	$('.slider-wrap-prod').mouseover(function() {
		  $( ".arrows-prod" ).removeClass( "hidden" );
	});
	$('.slider-wrap-prod').mouseleave(function() {
		  $( ".arrows-prod" ).addClass( "hidden" );
	});
	
});
