/*******************************************************************************
 * START HEADER
 ******************************************************************************/

function initHeader () {
    $('.js-header-secondary').on('mouseleave', function (e) {
        e.preventDefault();
        closeSubMenuSecondary();
    });

    $('.js-header-secondary > li > a').on('mouseenter', function (e) {
        e.preventDefault();
        hideLoginNudge();
        closeMainMenu();
        closeSubMenuSecondary();
        closeProfileMenu();
        $(this).addClass('item-active').next().removeClass('header-hide').addClass('header-menu-active');
    });

    triggerMainMenu();

    $('.header-primary-submenu-trigger').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('item-active')) {
            closeSubMenuMainMenu();
        } else {
            closeSubMenuMainMenu();
            $(this).addClass('item-active').next().removeClass('header-hide').addClass('header-submenu-active');
        }

    });

    //showLoginNudge();

    $(window).on('scroll', function () {
        $(window).scrollTop() > 0 ? $('body').addClass('window-scroll') : $('body').removeClass('window-scroll');
        hideLoginNudge();
    });

    $('.header-menu-profile-trigger').on('click', function (e) {
        e.preventDefault();
        closeMainMenu();
        if ($(this).hasClass('header-active')) {
            closeProfileMenu();
        } else {
            hideLoginNudge();
            $(this).addClass('header-active');
            $(this).closest('.header-primary').addClass('header-fixed-menu-open');
            $('#authed-menu').removeClass('header-hide').addClass('header-menu-active');
        }
    });
}

function closeSubMenuMainMenu () {
    $('.header-primary-submenu-trigger').removeClass('item-active');
    $('.header-primary-sub-submenu').removeClass('header-submenu-active').addClass('header-hide');
}

function closeMainMenu () {
    $('header .header-primary').removeClass('header-fixed-menu-open');
    $('.header-menu-trigger').removeClass('header-active');
    $('#main-menu').addClass('header-hide').removeClass('header-menu-active');
    ;
}

function closeSubMenuSecondary () {
    $('.js-header-secondary > li .header-secondary-sub').addClass('header-hide').removeClass('header-menu-active');
    $('.js-header-secondary > li > a').removeClass('item-active');
}

function showLoginNudge () {
    $('.js-close-login-nudge').on('click', function (e) {
        e.preventDefault();
        hideLoginNudge();
    });

    if (!$('header').hasClass('authed-header')) {
        setTimeout(function () {
            $('.header-user-nudge a').addClass('header-active');
            $('.js-header-login-nudge').removeClass('header-hide').addClass('header-login-nudge-active');

        }, 1000);
    }
}

function hideLoginNudge () {
    $('.header-user-nudge a').removeClass('header-active');
    $('.js-header-login-nudge').removeClass('header-login-nudge-active').addClass('header-hide');
}

function closeProfileMenu () {
    $('header .header-primary').removeClass('header-fixed-menu-open');
    $('.header-menu-profile-trigger').removeClass('header-active');
    $('#authed-menu').addClass('header-hide').removeClass('header-menu-active');
}

function triggerMainMenu () {
    if (typeof CQ_Analytics != 'undefined') {
        var mainMenuCallback = function () {
            var profile = CQ_Analytics['ProfileDataMgr'].data;
            var jHeaderMenuTriggered = $('.header-menu-trigger');
            var mainMenuSelector = function (jObject) {
                if (jHeaderMenuTriggered.hasClass('header-active')) {
                    closeMainMenu();
                } else {
                    hideLoginNudge();
                    jHeaderMenuTriggered.addClass('header-active');
                    jHeaderMenuTriggered.closest('.header-primary').addClass('header-fixed-menu-open');
                    jObject.removeClass('header-hide').addClass('header-menu-active');
                    jObject.css('display', 'block');
                }
            };
            if (!$.isEmptyObject(profile)) {
                var jMainMenu = $('#main-menu'), jMainMenuLoggedin = $('#main-menu-loggedin');
                if (profile.authorizableId.indexOf('anonymous') > -1) {
                    jHeaderMenuTriggered.unbind('click');
                    jHeaderMenuTriggered.on('click', function (event) {
                        event.preventDefault();
                        closeProfileMenu();
                        jMainMenuLoggedin.css('display', 'none');
                        jMainMenu.css('display', 'none');
                        mainMenuSelector(jMainMenu);
                    });
                } else {
                    jHeaderMenuTriggered.unbind('click');
                    jHeaderMenuTriggered.on('click', function (event) {
                        event.preventDefault();
                        closeProfileMenu();
                        jMainMenuLoggedin.css('display', 'none');
                        jMainMenu.css('display', 'none');
                        mainMenuSelector(jMainMenuLoggedin);
                    });
                }
            }
        };
        CQ_Analytics['ProfileDataMgr'].addListener('initialize', function () {
            mainMenuCallback();
        });
        mainMenuCallback();
    } else {
        // works on "static" html, where CQ_Analytics is not defined
        $('.header-menu-trigger').on('click', function (e) {
            e.preventDefault();
            closeProfileMenu();
            if ($(this).hasClass('header-active')) {
                closeMainMenu();
            } else {
                hideLoginNudge();
                $(this).addClass('header-active');
                $(this).closest('.header-primary').addClass('header-fixed-menu-open');
                $('#main-menu').removeClass('header-hide').addClass('header-menu-active');
            }
        });
    }
}

/*******************************************************************************
 * END HEADER
 ******************************************************************************/

/*******************************************************************************
 * START FOOTER
 ******************************************************************************/

function initFooter () {
    $(".beta-site-wrap .betaClose").on("click", function () {
        $(".beta-site-wrap").slideUp(400);
    });

    $(".overlayFooter h4.arrow-right").on("click", function () {
        if ($(window).width() > 991) {
            return;
        }

        if ($(this).hasClass("footerMenuOpen")) {
            $(this).removeClass("footerMenuOpen");
            $(this).next().slideUp(400);
        } else {
            $(this).addClass("footerMenuOpen");
            $(this).next().slideDown(400);
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $("footer ul").removeAttr('style');
        } else {
            $("footer ul").removeAttr('style');
            $("footer .footerMenuOpen").next().show(0);
        }
    });
}

/*******************************************************************************
 * END FOOTER
 ******************************************************************************/

/*******************************************************************************
 * START ACCORDION
 ******************************************************************************/

function initAccordion () {
    $('.js-accordion').unbind('click');
    $('.js-accordion').click(function (event) {
        event.preventDefault();
        $(this).parent().next('.accordion-body').slideToggle();
        $(this).parent().parent('.accordion').toggleClass('active');
    });
}

/*******************************************************************************
 * END ACCORDION
 ******************************************************************************/
/*******************************************************************************
 * START CATALOGUE
 ******************************************************************************/

function initCatalogue () {

    showHideCompareCheckbox();

    initMenuSortByFilter();
}

function showHideCompareCheckbox () {
    $(".js-catalogue-wrap .label-checkbox-red[scope='compare']").on("click", function () {
        $(this).toggleClass('checked-compare');
        $('.js-catalogue-wrap .link-compare-now').addClass('hide');
        $('.js-catalogue-wrap .label-checkbox-red .ck-text').removeClass('hide');

        if ($('.js-catalogue-wrap .checked-compare').length > 1) {
            $.each($('.js-catalogue-wrap .checked-compare'), function () {
                var wrapper = $(this).closest('.detail-product');
                wrapper.find('.link-compare-now').removeClass('hide');
                wrapper.find('.checked-compare .ck-text').addClass('hide');
            });
        }
    });
}

function initMenuSortByFilter () {
    /* open/close menu sort by */
    $(".js-filters-cat-row .sort-filters-sub").on("click", function (e) {
        e.preventDefault();

        if ($(this).hasClass("active")) {
            $(".js-filters-cat-row .submenu-sort-by-filters").slideUp(400);
        } else {
            $(".js-filters-cat-row .submenu-sort-by-filters").slideDown(400, function () {
                $('body').off('click').on('click', function () {
                    $(".js-filters-cat-row .submenu-sort-by-filters").slideUp();
                    $(".js-filters-cat-row .sort-filters-sub").removeClass("active");
                    $('body').off('click');
                });
            });
        }
        $(this).toggleClass("active");
    });

    /* click event on sort filter list */
    $(".js-filters-cat-row .submenu-sort-by-filters li").on("click", function () {
        var textSelected = $(this).html();
        $(".js-filters-cat-row .sort-filters-sub span").html(textSelected);

        $(".js-filters-cat-row .submenu-sort-by-filters li").removeClass("active");
        $(this).addClass("active");

        $(".js-filters-cat-row .sort-filters-sub").trigger("click");
    });
}

/*******************************************************************************
 * END CATALOGUE
 ******************************************************************************/
/*******************************************************************************
 * START HELP TAB
 ******************************************************************************/

function initHelp () {
    $(".js-help-tab-wrapper .tab").on("click", function () {
        if (!$(this).hasClass("active")) {
            if ($(this).hasClass("background-gray")) {
                $(".js-help-tab-wrapper .tab.active").addClass("background-gray");
                $(this).removeClass("background-gray");
            }
            $(".js-help-tab-wrapper .tab").removeClass("active");
            $(this).addClass("active");
            var tab = $(this).attr("tab");

            if ($(window).width() < 992) {
                $(".js-help-tab-wrapper .box-help").slideUp(300);
                setTimeout(function () {
                    $(".js-help-tab-wrapper ." + tab).slideDown(300);
                }, 300);
            } else {
                $(".js-help-tab-wrapper .box-help").fadeOut(300);
                setTimeout(function () {
                    $(".js-help-tab-wrapper ." + tab).fadeIn(300);
                }, 300);
            }
        }
    });
}

/*******************************************************************************
 * END HELP TAB
 ******************************************************************************/
/*******************************************************************************
 * START SHOP TAB
 ******************************************************************************/

function initShop () {
    $(".sectionShop").on(
        "click",
        function () {
            if ($(window).width() > 767) {
                if ($(this).hasClass("active")) {
                    return;
                }
                $(".active").find(".showImg").addClass("hiddenImg").removeClass("showImg").prev().addClass("showImg")
                    .removeClass("hiddenImg");
                $(".sectionShop.active").removeClass("active");
                var c = $(this).attr("section");
                $('.sectionShop[section=' + c + ']').addClass("active");

                $(".boxShop").fadeOut(500);
                setTimeout(function () {
                    $("." + c).fadeIn(500);
                }, 499);

                $('.sectionShop[section=' + c + ']').find(".showImg").addClass("hiddenImg").removeClass("showImg")
                    .next().addClass("showImg").removeClass("hiddenImg");
            } else {
                if ($(this).hasClass("active")) {
                    var c = $(this).attr("section");
                    $("." + c).slideUp(500);
                    $('.sectionShop[section=' + c + ']').find(".showImg").addClass("hiddenImg").removeClass("showImg")
                        .prev().addClass("showImg").removeClass("hiddenImg");
                    $('.sectionShop[section=' + c + ']').removeClass("active");
                    return;
                }
                var c = $(this).attr("section");
                $(".active").find(".showImg").addClass("hiddenImg").removeClass("showImg").prev().addClass("showImg")
                    .removeClass("hiddenImg");
                if ($(this).hasClass("active")) {
                    $("." + c).slideUp(500);
                }
                $(".active").removeClass("active");
                $('.sectionShop[section=' + c + ']').addClass("active");
                $(".boxShop").slideUp(500);
                setTimeout(function () {
                    $("." + c).slideDown(500);
                }, 499);

                $('.sectionShop[section=' + c + ']').find(".showImg").addClass("hiddenImg").removeClass("showImg")
                    .next().addClass("showImg").removeClass("hiddenImg");
            }
        });
    $(window).resize(function () {
        if ($(window).width() > 767) {
            if (!$(".shop .active").length > 0) {
                $(".sectionShop:eq(0)").trigger("click");
            }
        }
    });
}

/*******************************************************************************
 * END SHOP TAB
 ******************************************************************************/
/*******************************************************************************
 * START NOTIFICATION
 ******************************************************************************/

function initNotification () {
    $(".js-notification-btn-close").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.notification').removeClass('notification-opened');
    });

}

/*******************************************************************************
 * END NOTIFICATION
 ******************************************************************************/
/*******************************************************************************
 * START SLIDER HOME
 ******************************************************************************/

function initSliderHome () {
    var numSlideShow = 3;
    var numSlideShowTablet = 2;
    var numSlideShowMobile = 1;
    var numSlide = $('.slider-wrap .cta-slider-wrap .cta-slider-single').length;

    switch (numSlide) {
    case 1:
        numSlideShow = 3;
        $('.slider-wrap .control-wrap').addClass('hide');
        break;
    case 2:
        numSlideShow = 1;
        numSlideShowTablet = 1;
        $('.slider-wrap .container-fluid').addClass('two-slide');
        break;
    case 3:
        numSlideShow = 1;
        numSlideShowTablet = 1;
        $('.slider-wrap .container-fluid').addClass('three-slide');
        break;
    default:
        numSlideShow = 3;
        break;
    }
    $('.slider-wrap .image-slider-wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        lazyLoad: 'ondemand',
        pauseOnHover: false,
        asNavFor: '.cta-slider-wrap'
    });

    $('.slider-wrap .cta-slider-wrap').slick({
        slidesToShow: numSlideShow,
        slidesToScroll: 1,
        asNavFor: '.image-slider-wrap',
        dots: true,
        arrows: false,
        pauseOnHover: false,
        appendDots: $('.control-wrap .dots-wrap'),

        autoplay: true,
        autoplaySpeed: $('.slider-wrap').attr('data-time-autoplay'),
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

    $('.control-wrap .slider-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('slider-toggle-paused');
        if ($(this).hasClass('slider-toggle-paused')) {
            $('.slider-wrap .cta-slider-wrap').slick('slickPause');
        } else {
            $('.slider-wrap .cta-slider-wrap').slick('slickPlay');
        }
    });
}

/*******************************************************************************
 * END SLIDER HOME
 ******************************************************************************/
/*******************************************************************************
 * START SLIDER ABOUT
 ******************************************************************************/

function initSliderAbout () {
    $('.slider-wrap-about').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        focusOnSelect: true
    });

    $('.slider-wrap-about').on('afterChange', function (event, slick, currentSlide, nextSlide) {

        var current = $(".slick-slide[data-slick-index='" + currentSlide + "']");

        $('.slider-text-container.active').removeClass('active');
        $(".slider-text-container[data-show=" + $(current).attr('data-show') + "]").addClass('active');
    });
}

/*******************************************************************************
 * END SLIDER ABOUT
 ******************************************************************************/

/*******************************************************************************
 * START OVERLAY
 ******************************************************************************/

var _filtri = [];

function initOverlayFullScreen () {

    $(".modal-fullscreen").on(
        'show.bs.modal',
        function () {
            setTimeout(function () {
                $(".modal-backdrop").addClass("modal-backdrop-fullscreen");

                /* Init Custom Select */
                $.each($('select.style-select'), function () {
                    var wrapperSelect = $(this).closest('.voda-select');
                    $(this).select2({
                        minimumResultsForSearch: -1,
                        dropdownParent: wrapperSelect
                    });
                });

                /* Init Custom Datepicker */
                $('.datepicker input').datepicker({
                    changeMonth: true,
                    changeYear: true,
                    beforeShow: function (input, obj) {
                        $(input).after($(input).datepicker('widget'));
                    }
                });

                /* Init Clearfields */
                initClearField();

                /* trigger accordion/tab on mobile */
                $('.nav-tabs.modal-navRow li').off('click').on(
                    'click',
                    function () {
                        $('.modal-body .tab-content .title-accordion.selected').removeClass('selected');
                        $(
                            '.modal-body .tab-content .title-accordion[data-panel="'
                                + $(this).find('a').attr('aria-controls') + '"]').addClass('selected');
                    });
                $('.modal-body .tab-content .title-accordion').off("click").on(
                    'click',
                    function () {
                        var tabTrigger = $(".modal-body .nav-tabs.modal-navRow li a[aria-controls='"
                            + $(this).attr('data-panel') + "']");
                        tabTrigger.trigger('click');

                        $('.modal-body .tab-content .title-accordion.selected').removeClass('selected');
                        $(this).addClass('selected');
                    });

                /* Hide/Show payment div */
                var p = $('input[name="payment"]:checked').val();
                $(".js-payment-overlay." + p).slideDown();

                $('input[name="payment"]').change(function () {
                    var p = $(this).val();
                    $(".js-payment-overlay").slideUp();
                    $(".js-payment-overlay." + p).slideDown();
                });

                $(".circleTopUp span").off("click").on("click", function () {
                    if (!$(this).hasClass("active")) {
                        $(".circleTopUp span").removeClass("active");
                        $(this).addClass("active");
                    }
                });

                $("#payment-type-select-onceoff").change(function () {
                    var t = $(this).find(":selected").val();
                    $(".topuppayment").slideUp();
                    $(".topuppayment." + t).slideDown();
                });
                $("#payment-type-select-recurring").change(function () {
                    var t = $(this).find(":selected").val();
                    $(".topuppaymentrecurring").slideUp();
                    $(".topuppaymentrecurring." + t).slideDown();
                });

                $('input[name="recurring"]').change(function () {
                    var p = $(this).val();
                    $(".based-on").slideUp();
                    $(".based-on." + p).slideDown();
                });

                /* Init Accordion */
                $('.modal-body .js-accordion').off("click").on("click", function (event) {
                    event.preventDefault();
                    $(this).parent().next('.accordion-body').slideToggle();
                    $(this).parent().parent('.accordion').toggleClass('active');
                });

                $(".showmore-js-overlay").on("click", function () {
                    var s = $(this).attr("open-boxes");
                    if (!$(this).hasClass("open")) {
                        $("." + s + " .answersearch").each(function () {
                            $(this).slideDown();
                        });
                        $(this).addClass("open");
                        $(this).html("Show less results");
                    } else {
                        $("." + s + " .answersearch").each(function () {
                            if (!$(this).hasClass("show")) {
                                $(this).slideUp();
                            }
                        });
                        $(this).removeClass("open");
                        $(this).html("Show more results");
                    }
                });

                /* Catalogue Filter */
                $(".col-filters .element-col-filter").off('click').on(
                    "click",
                    function () {
                        var f = $(this).attr("type-filter");
                        var c = $(this).html();
                        var mc = $(this).attr("filter");

                        if ($(this).hasClass("active")) {
                            $(".col-filters .select-element-col-filter[fil=" + mc + "]").remove();
                            $(this).removeClass("active");
                        } else {
                            $(this).addClass("active");
                            var s = "<div class='select-element-col-filter' fil='" + mc + "'>" + c
                                + " <span class='remove-filter' remove-filter='" + mc
                                + "'><img src='images/icons/close-red.png' /></span></div>";
                            $(".filter-selected-wrap .fils .selected." + f).append(s);

                        }

                        $(".select-element-col-filter .remove-filter").off('click').on("click", function () {
                            var mc = $(this).attr("remove-filter");

                            $(".col-filters .element-col-filter[filter=" + mc + "]").removeClass("active");
                            $(this).parent().remove();
                        });

                    });

                if (_filtri.length > 0) {
                    $.each(_filtri, function (k, v) {
                        $(".element-col-filter[filter='" + v + "']").trigger('click');
                    });
                }

                $(".js-save-filters").off('click').on("click", function () {
                    var n = 0;
                    _filtri = [];

                    $.each($(".select-element-col-filter"), function () {
                        var mc = $(this).attr("fil");

                        _filtri.push(mc);
                        n++;
                    });

                    $(".js-number-filters-cat").html(n);
                    $(".modal-header .close.icon-close").trigger("click");
                });

                $('.js-clear-filters').off('click').on('click', function () {
                    $('.filter-selected-wrap .col-filters').empty();
                    $('.element-filter-wrap .element-col-filter.active').removeClass('active');
                    _filtri = [];
                });

                $(".title-col-filter").on("click", function () {
                    if ($(window).width() > 767)
                        return;

                    if ($(this).hasClass("active")) {
                        $(this).next().slideUp();
                    } else {
                        $(this).next().slideDown();
                    }
                    $(this).toggleClass("active");
                });

                $(window).resize(function () {
                    if ($(window).width() > 767) {
                        $(".element-filter-wrap").removeAttr('style');
                    } else {
                        $(".element-filter-wrap").removeAttr('style');
                        $(".title-col-filter.active").next().show(0);
                    }
                });

                /* Show/Hide Edit Email Billing details */
                $('input[name="billing"]').change(function () {
                    var typeBilling = $(this).val();

                    if (typeBilling === 'online-billing') {
                        $('.js-edit-email').slideDown();
                    } else {
                        $('.js-edit-email').slideUp();
                        $('.js-email-editable').attr('disabled', 'true');
                    }
                });

                $('.js-ico-edit-email').off('click').on('click', function () {
                    $('.js-email-editable').removeAttr('disabled');
                });

            }, 300);
        });
    $(".modal-fullscreen").on('hidden.bs.modal', function () {
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
        $(this).removeData('bs.modal');
        var videos = $(this).find('video');
        if (videos.length > 0) {
            videos.get(0).pause();
        }
    });

}
/*******************************************************************************
 * END OVERLAY
 ******************************************************************************/

/*******************************************************************************
 * START PIECHART
 ******************************************************************************/

function initPieChart () {
    $.each($('.js-piechart-voda'), function () {
        var color = $(this).attr('data-color');
        $(this).easyPieChart({
            lineCap: 'round',
            lineWidth: 10,
            size: 180,
            barColor: color,
            trackColor: '#F4F4F4',
            scaleColor: false
        });
    });

    $('.js-change-piechart-voda .bullet-value').on('click', function (evt) {
        var container = $(this).closest('.js-change-piechart-voda');
        container.find('.bullet-value.active').removeClass('active');
        $(this).addClass('active');
        var typeText = $(this).attr('data-type');
        var percent = $(this).attr('data-percent');
        var title = $(this).attr('data-title');
        var price = $(this).attr('data-price');
        var note = $(this).attr('data-note');
        var chart = $(this).closest('.piechart-voda');

        chart.removeClass('simple price').addClass(typeText);
        chart.attr('data-percent', percent);
        chart.find('.piechart-title').html(title);
        chart.find('.piechart-price').html(price);
        chart.find('.piechart-note').html(note);

        chart.data('easyPieChart').update(0);
        chart.data('easyPieChart').update(percent);
    });
}

/*******************************************************************************
 * END PIECHART
 ******************************************************************************/

/*******************************************************************************
 * START USAGE
 ******************************************************************************/

function initViewUsage () {
    $('.js-list-btn-usage a').on('click', function (e) {
        e.preventDefault();

        $('.js-list-btn-usage a.active').removeClass('active');
        $(this).addClass('active');

        $('.chart-usage-wrap').removeClass('opened');

        var idContent = $(this).attr('data-content');
        $('#' + idContent).addClass('opened');

        $.each($('.js-piechart-voda'), function () {
            var percent = $(this).attr('data-percent');
            $(this).data('easyPieChart').update(0);
            $(this).data('easyPieChart').update(percent);
        });
    });
}

/*******************************************************************************
 * END USAGE
 ******************************************************************************/

// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group',
            'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time',
            'timeEnd', 'timeStamp', 'trace', 'warn' ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var collect = function () {
    var ret = {};
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        for (var p in arguments[i]) {
            if (arguments[i].hasOwnProperty(p)) {
                ret[p] = arguments[i][p];
            }
        }
    }
    return ret;
};

/*******************************************************************************
 * START DIV STICKY
 ******************************************************************************/
function stickyRelocate () {
    /* Sticky summary configurator */
    if ($('.sticky-anchor-product').length > 0) {
        var window_top = $(window).scrollTop();
        var div_top = $('.sticky-anchor-product').offset().top;

        if (window_top > div_top) {
            $('.sticky-div-product').addClass('stick');
            var alto = $('.sticky-div-product').innerHeight();
            $('.sticky-anchor-product').css('height', alto + 'px');
            if ($('.sticky-div-product.stick .brand').length > 0) {
                $("header .brand").css("display", "none");
            }
        } else {
            if ($('.sticky-div-product.stick .brand').length > 0) {
                $("header .brand").removeAttr('style');
            }
            $('.sticky-div-product').removeClass('stick');
            $('.sticky-anchor-product').removeAttr('style');
        }
    }

    /* Sticky filters catalogue */
    if ($('.sticky-anchor-filters').length > 0) {
        var window_top = $(window).scrollTop();
        var div_top = $('.sticky-anchor-filters').offset().top;
        var stickyProductHeight = 0;

        if ($('.sticky-anchor-product').length > 0) {
            stickyProductHeight = $('.sticky-div-product').innerHeight();
        }

        if ((window_top + stickyProductHeight) > div_top) {
            $('.sticky-div-filters').addClass('stick');
            var alto = $('.sticky-div-filters').innerHeight();
            if ($('.sticky-anchor-product').length > 0) {
                $('.sticky-div-filters').css('top', $('.sticky-div-product').innerHeight() + 'px');
            }
            $('.sticky-anchor-filters').css('height', alto + 'px');
        } else {
            $('.sticky-div-filters').removeClass('stick');
            $('.sticky-anchor-filters').removeAttr('style');
        }
    }
}

/*******************************************************************************
 * END DIV STICKY
 *******************************************************************************/

/*******************************************************************************
 * START CLEAR FIELD BUTTON
 *******************************************************************************/
function initClearField () {
    $(".hasclear").keyup(function () {
        var t = $(this);
        t.next('span').toggle(Boolean(t.val()));
    });

    $(".clearer").hide($(this).prev('input').val());

    $(".clearer").click(function () {
        $(this).prev('input').val('').focus();
        $(this).hide();
    });
};

var initCustomDatapicker = function() {
    /* Init Custom Datepicker */
    $('.datepicker input').datepicker({
        changeMonth: true,
        changeYear: true,
        beforeShow: function (input, obj) {
            $(input).after($(input).datepicker('widget'));
        }
    });
};

/*******************************************************************************
 * END CLEAR FIELD BUTTON
 *******************************************************************************/

var initCustomSelect = function() {
    /* Init Custom Select */
    $.each($('select.style-select'), function () {
        var wrapperSelect = $(this).closest('.voda-select');
        $(this).select2({
            minimumResultsForSearch: -1,
            dropdownParent: wrapperSelect
        })
    });
};


$(document).ready(function () {
    initCustomSelect();
    initCustomDatapicker();
    initHeader();
    initFooter();
    initAccordion();
    initHelp();
    initNotification();
    initShop();
    initSliderHome();
    initSliderAbout();
    initCatalogue();
    initOverlayFullScreen();
    initPieChart();
    initViewUsage();
    stickyRelocate();
    initClearField();

    /** *** LASCIARE PER ULTIMO ***** */
    // Init jquery plugin breakpoint for img load
    if ($('.img-breakpoint').length > 0) {
        $(".img-breakpoint").breakpoint();
    }
});

$(window).on("scroll", function () {
    stickyRelocate();
});
