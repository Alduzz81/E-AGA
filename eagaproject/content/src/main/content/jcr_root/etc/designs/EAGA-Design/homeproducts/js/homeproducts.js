/*******************************************************************************
 * START SLIDER HOME PROD
 ******************************************************************************/

function initSliderHomeProd () {
	console.log("sono dentro a funzione slider home prod");

    var numSlideShow = 3;
    var numSlideShowTablet = 2;
    var numSlideShowMobile = 1;
    var numSlide = $('.slider-wrap-prod .cta-slider-wrap .cta-slider-single').length;
    console.log("numslide: ", numSlide);

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
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        lazyLoad: 'ondemand',
        pauseOnHover: false,
        asNavFor: '.cta-slider-wrap'
    });

    $('.slider-wrap-prod .cta-slider-wrap').slick({
        slidesToShow: numSlideShow,
        slidesToScroll: 1,
        asNavFor: '.image-slider-wrap-prod',
        dots: true,
        arrows: false,
        pauseOnHover: false,
        appendDots: $('.control-wrap-prod .dots-wrap-prod'),

        autoplay: true,
        autoplaySpeed: $('.slider-wrap-prod').attr('data-time-autoplay'),
        responsive: [ {
            breakpoint: 969,
            settings: {
                slidesToShow: numSlideShowTablet,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: numSlideShowMobile,
                slidesToScroll: 1
            }
        } ]
    });

    $('.control-wrap-prod .slider-toggle-prod').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('slider-toggle-paused');
        if ($(this).hasClass('slider-toggle-paused')) {
            $('.slider-wrap-prod .cta-slider-wrap').slick('slickPause');
        } else {
            $('.slider-wrap-prod .cta-slider-wrap').slick('slickPlay');
        }
    });
}

/*******************************************************************************
 * END SLIDER HOME PROD
 ******************************************************************************/


$(document).ready(function () {
	initSliderHomeProd ()
});
