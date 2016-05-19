$(document).ajaxComplete(function() {
    //Check XTOKEN cookie. If it's not defined then reload profile as anonymous
    var checkToken = function () {
        var profile = CQ_Analytics.ProfileDataMgr.data;
        if (!$.isEmptyObject(profile) && profile.authorizableId.indexOf('anonymous') === -1
            && $.portal.getCookie('XTOKEN') === null) {
            $.portal.logout();
        }
    };
    CQ_Analytics.ProfileDataMgr.addListener('initialize', checkToken);
});

var events = (function () {
    var topics = {};

    return {
        subscribe: function (topic, callback) {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }

            var index = topics[topic].push(callback) - 1;

            return {
                remove: function () {
                    delete topics[topic][index];
                }
            };
        },
        publish: function (topic, data) {
            if (!topics.hasOwnProperty(topic)) {
                return;
            }

            topics[topic].forEach(function (callback) {
                callback(data !== undefined ? data : {});
            });
        }
    };
})();