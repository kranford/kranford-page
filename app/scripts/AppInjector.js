define([
    'model',
    'jquery',
    'utils/Logger',
    'angular',
    'angular-translate',
    'angular-ui-router',
    'RoutingConfig',
    'directive/holderJs',
    'directive/marked'
],
    function (model, $, logger, angular, angularTranslate, uiroute, routingConfig, holderJs, markedDir) {
        var appBootstrap = function () {
            var appName = "kranford";
            var app = angular.module(appName, ['pascalprecht.translate','ui.router', routingConfig.name, holderJs.name, markedDir.name]);
            app.config([ '$locationProvider', function ($locationProvider) {
                $locationProvider.html5Mode(false);
            }]);

            app.config(['$translateProvider', function($translateProvider) {
                $translateProvider.translations('en', model.contents.en.translate_json);
                $translateProvider.translations('pl', model.contents.pl.translate_json);
                $translateProvider.preferredLanguage('pl');
//                $translateProvider.determinePreferredLanguage();
            }]);
            app.run(['$rootScope', '$state', '$stateParams',
                function ($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }]);
            angular.element(document).ready(function () {

                angular.bootstrap(document, [appName]);
            });

        };
        return {
            appBootstrap: appBootstrap
        };
    });