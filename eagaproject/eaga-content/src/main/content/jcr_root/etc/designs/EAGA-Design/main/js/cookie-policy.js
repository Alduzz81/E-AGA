var cookie = {
    setCookie: function (key, value, time) {
        var expires = new Date();
        expires.setTime(expires.getTime() + time);
        document.cookie = key + '=' + value + "; path=/content"+';'; ;//expires=' + expires.toUTCString();
    },
    getCookie: function (key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }
};

function initNotification () {
    var cookieValue = cookie.getCookie("cookie-policy-bar-vodafone");
    if (cookieValue === "true") {
        $('div.notification').removeClass("notification-opened");
    } else {
        $('div.notification').addClass("notification-opened");
    }

    $(".js-notification-btn-close").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.notification').removeClass('notification-opened');
        cookie.setCookie("cookie-policy-bar-vodafone", "true", 10 * 60 * 1000);
    });
    
    $("#clickClose").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.notification').removeClass('notification-opened');
        cookie.setCookie("cookie-policy-bar-vodafone", "true", 10 * 60 * 1000);
        window.location.href = '/content/eaga/cookiePrivacyPolicy.html';
    });
}