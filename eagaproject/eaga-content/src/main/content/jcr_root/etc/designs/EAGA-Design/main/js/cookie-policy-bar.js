/*var cookie = {
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
    console.log("cookieValue:" + cookieValue);

    if (cookieValue === "true") {
        console.log("CLOSE1");
        $('div.notification').removeClass("notification-opened");
    } else {
        $('div.notification').addClass("notification-opened");
    }

    $(".js-notification-btn-close").on("click", function (e) {
        e.preventDefault();
        $(this).closest('.notification').removeClass('notification-opened');
        console.log("CLOSE2");
        cookie.setCookie("cookie-policy-bar-vodafone", "true", 10 * 60 * 1000);
        console.log("END " + cookie.getCookie("cookie-policy-bar-vodafone"));
    });
}*/