
    var exec = require('cordova/exec'),
        argscheck = require('cordova/argscheck'),
        AppsFlyerError = require('./AppsFlyerError');
    

    if (!window.CustomEvent) {
        window.CustomEvent = function (type, config) {
            var e = document.createEvent("CustomEvent");
            e.initCustomEvent(type, true, true, config.detail);
            return e;
        };
    }

    (function (global) {
        var AppsFlyer = function () {};

        AppsFlyer.prototype.initSdk = function (args, successCB, errorCB) {
            argscheck.checkArgs('O', 'AppsFlyer.initSdk', arguments);

        if (!args) {
            if (errorCB) {
                errorCB(AppsFlyerError.INVALID_ARGUMENT_ERROR);                
            }
        } else {
            if(args.appId !== undefined && typeof args.appId != 'string'){
                if (errorCB) {
                  errorCB(AppsFlyerError.APPID_NOT_VALID);
               }
             }

             exec(successCB, errorCB, "AppsFlyerPlugin", "initSdk", [args]);    
          }           
        };

        AppsFlyer.prototype.setCurrencyCode = function (currencyId) {
            argscheck.checkArgs('S', 'AppsFlyer.setCurrencyCode', arguments);
            exec(null, null, "AppsFlyerPlugin", "setCurrencyCode", [currencyId]);
        };

        AppsFlyer.prototype.setAppUserId = function (customerUserId) {
             argscheck.checkArgs('S', 'AppsFlyer.setAppUserId', arguments);
            exec(null, null, "AppsFlyerPlugin", "setAppUserId", [customerUserId]);
        };
        AppsFlyer.prototype.setGCMProjectID = function (GCMProjectID) {
            argscheck.checkArgs('S', 'AppsFlyer.setGCMProjectID', arguments);
            exec(null, null, "AppsFlyerPlugin", "setGCMProjectID", [GCMProjectID]);
        };
        AppsFlyer.prototype.registerUninstall = function (token) {
            argscheck.checkArgs('S', 'AppsFlyer.registerUninstall', arguments);
            exec(null, null, "AppsFlyerPlugin", "registerUninstall", [token]);
        };
        AppsFlyer.prototype.getAppsFlyerUID = function (successCB) {
            argscheck.checkArgs('F', 'AppsFlyer.getAppsFlyerUID', arguments);
            exec(function (result) {
                successCB(result);
            }, null,
                    "AppsFlyerPlugin",
                    "getAppsFlyerUID",
                    []);
        };

        AppsFlyer.prototype.trackEvent = function (eventName, eventValue) {
            argscheck.checkArgs('SO', 'AppsFlyer.trackEvent', arguments);
            exec(null, null, "AppsFlyerPlugin", "trackEvent", [eventName, eventValue]);
        };

        AppsFlyer.prototype.onInstallConversionDataLoaded = function (conversionData) {
            var data = conversionData,
                    event;
            if (typeof data === "string") {
                data = JSON.parse(conversionData);
            }
            event = new CustomEvent('onInstallConversionDataLoaded', {'detail': data});
            global.document.dispatchEvent(event);
        };

        global.cordova.addConstructor(function () {
            if (!global.Cordova) {
                global.Cordova = global.cordova;
            }

            if (!global.plugins) {
                global.plugins = {};
            }

            global.plugins.appsFlyer = new AppsFlyer();
        });
        document.addEventListener("deviceready", function(){
    
   var options = {
             devKey:  'PyrkbYhAsYyRs8ZfmxuyPU'// your AppsFlyer devKey                
           };
 
    var userAgent = window.navigator.userAgent.toLowerCase();
                          
    if (/iphone|ipad|ipod/.test( userAgent )) {
        options.appId = "123456789";            // your ios app id in app store         
    }
    window.plugins.appsFlyer.initSdk(options);
}, false);
    }(window));

    
