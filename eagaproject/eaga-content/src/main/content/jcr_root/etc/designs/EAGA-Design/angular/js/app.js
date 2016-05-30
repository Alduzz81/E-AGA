var eagaApp = angular.module('eagaApp', []);

/**
 * Collection of methods used with AngularJS Framework
 * @type {{profileCallBack: eagaApp.API.profileCallBack}}
 */
eagaApp.API = {

    /**
     * Function used to render html template using data from CQ_Analytics.ProfileDataMgr
     * @param scopeProperty $scope property from AngularJS controller
     * @param profileProperty CQ_Analytics.ProfileDataMgr.data property (CQ_Analytics.ProfileDataMgr.data[profileProperty])
     * @param applyProfileDataCallback callback that override applyProfileData method. Put null if you don't want to override
     * @params a collection of callbacks (not mandatory)
     */
    profileCallBack: function (scopeProperty, profileProperty, applyProfileDataCallback) {
        var functionArguments = arguments,
            self = this;

        function applyProfileData(variable) {
            self[scopeProperty] = variable;
            setTimeout(function () {
                if (functionArguments && functionArguments.length > 2) {
                    for (var i = 3; i < functionArguments.length; i++) {
                        var callback = functionArguments[i];
                        callback();
                    }
                }
            }, 5);
        }

        var profileLoadCallback = function () {
            var profile = CQ_Analytics.ProfileDataMgr.data;
            if (!$.isEmptyObject(profile) && profile.authorizableId.indexOf('anonymous') === -1) {
                if(applyProfileDataCallback === null || typeof applyProfileDataCallback === 'undefined') {
                    applyProfileData(profile[profileProperty]);
                } else {
                    applyProfileDataCallback.call(self, functionArguments);
                }
            }
        };
        CQ_Analytics.ProfileDataMgr.addListener('initialize', profileLoadCallback);
        profileLoadCallback();
    }

};