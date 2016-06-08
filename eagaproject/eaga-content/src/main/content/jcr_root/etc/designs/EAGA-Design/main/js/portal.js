(function ($) {
    if ($.portal === undefined) {
        $.portal = {
            login: function () {
                var params = {
                    '_charset_': 'UTF-8',
                    'j_username': $("input[name=userEmail]").val(),
                    'j_password': $("input[name=userPass]").val()
                };
                var path = CQ.shared.HTTP.getPath();

                $.ajax({
                    type: 'POST',
                    url: path + '/eaga_security_check',
                    data: params,
                    success: function (data) {
                       // $.portal.closeMainMenu();
                        CQ_Analytics.ProfileDataMgr.loadProfile($("input[name=userEmail]").val());
                       // $.portal.toggleAuthorized();
                        console.log('Login procedure correct: ' + status);
                        location.reload();
                        window.location.href = '/content/eaga.html';
                    },
                    error: function (data, status) {
                        console.log('Login procedure failed: ' + status);
                    }
                });
            },
            logout: function (redirectTarget) {
                if (CQ_Analytics && CQ_Analytics.CCM) {
                    CQ_Analytics.ProfileDataMgr.clear();
                    CQ_Analytics.CCM.reset();
                }
                CQ.shared.HTTP.clearCookie('CommercePersistence', '/');
                CQ.shared.HTTP.clearCookie('XTOKEN', '/');
                $.portal.clearSession();
                CQ_Analytics.Utils.load('/system/sling/logout.html');
                $.portal.closeMainMenu();
                $.portal.resetForm();
                $.portal.toggleAnonymous();
                if (redirectTarget) {
                    window.location.href = redirectTarget;
                } else {
                    window.location.href = '/content/eaga.html';
                }
            },
            clearSession: function() {
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    $.portal.eraseCookie(cookies[i].split("=")[0]);
                }
                if (localStorage) {
                    localStorage.clear();
                }
                if (sessionStorage) {
                    sessionStorage.clear();
                }
            },
            eraseCookie: function(name) {
                $.portal.createCookie(name, "", -1);
            },
            createCookie: function(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else
                    var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            toggleAnonymous: function () {
                $('.header-navigation .header-user-nudge').show();
                $('.header-navigation .header-user-profile').hide();
                $('.header-menu-trigger').removeClass('header-active');
            },
            toggleAuthorized: function () {
                $('.vodafone-overlay').find('button[type="button"]').click(); //TODO: put the correct behaviour
                $('.header-navigation .header-user-nudge').hide();
                $('.header-navigation .header-user-profile').show();
                $('.header-menu-trigger').removeClass('header-active');
            },
            closeMainMenu: function () {
                $('#main-menu-loggedin').css('display', 'none');
                $('#main-menu').css('display', 'none');
            },
            resetForm: function () {
                $('.vodafone-overlay #login-username').val('');
                $('.vodafone-overlay #login-password').val('');
            },
            getCookie: function(name) {
                var regex = new RegExp(name + "=([^;]+)");
                var value = regex.exec(document.cookie);
                return (value != null) ? decodeURI(value[1]) : null;
            },
            saveToDisk: function(pdfurl) {
                var val = navigator.userAgent.toLowerCase();
                if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
                {
                    //alert('This is IE browser..');
                    var w=window.open(pdfurl, '_blank');
                    w.focus();
                } else {
                    //alert('This is in clint lib.')
                    var link = document.createElement("a");
                    link.download = 'customerBill.pdf';
                    link.href = pdfurl;
                    var clickEvent = document.createEvent("MouseEvent");
                    clickEvent.initEvent("click", true, true);
                    link.dispatchEvent(clickEvent);
                }

            }

        };
    }
})(jQuery);