define([
    'utils/Logger',
    'angular',
    'angular-ui-router',
    'routing/mainAppRouting'
],
    function (logger, angular, uiroute, mainRouting) {
        var moduleName = 'routingRootContener';
        var module = angular.module(moduleName, ['ui.router', mainRouting.name]);
        module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/init");
        }]);
        return {
            m: module,
            name: moduleName
        };
    });