define(['model', 'angular', 'underscore', 'underscore.string', 'utils/Lens'], function (model, angular, _, _s, Lens) {
    'use strict';
    var moduleName = 'kranfordControllersModule';
    var emptyControllerName = 'emptyController';
    var serviceInfoName = 'serviceInfo';
    var rootControllerName = 'initController';
    var teamControllerName = 'teamController';
    var partnersControllerName = 'partnersController';
    var module = angular.module(moduleName, []);

    var checkParam = function (param) {
        return angular.isDefined(param) && param !== null && param.length !== 0;
    };

    var sByID = function (sid) {
        return Lens.listElementLen(Lens.matcherFromLen(Lens.fieldLen("sid"))(sid));
    };
    var personBuild = function (id, name, position) {
        return {
            pid: id,
            name: name,
            position: position,
            icon: './assets/team/team' + id + '.jpg'
        };
    };
    var personBuildOffset = function () {
        return {
            offset: true
        };
    };
    var lang = 'pl';

    function getServiceModel() {
        return model.contents[lang].service;
    }

    var partnersLogos = model.contents.views.partner;
    var team = [
        {
            role: 'TEAM.manager',
            persons: [personBuildOffset(), personBuildOffset(),
                personBuild(1, 'Adam Grudziński-Staniewski', 'TEAM.head'),
                personBuild(2, 'Tom Holmes', 'TEAM.head')
            ]
        },
        {
            role: 'TEAM.section',
            persons: [
                personBuildOffset(),
                personBuild(4, 'Julia Banaszewska', 'TEAM.marketing'),
                personBuild(6, 'Luis Carlos Arribas', 'TEAM.madrid'),
                personBuild(3, 'Stanisław Średnicki', 'TEAM.account')
            ]
        }
    ];

    var initBlocks = [
        {
            name: "MAIN.IKO1",
            state: "#/serviceInfo/9",
            image: "./assets/icon/main1.jpg"
        },
        {
            name: "MAIN.IKO2",
            state: "#/serviceInfo/8",
            image: "./assets/icon/main2.jpg"
        },
        {
            name: "MAIN.IKO3",
            link: "http://www.tatrzanskie-turnie.pl/",
            image: "./assets/icon/main3.jpg"
        },
        {
            name: "MAIN.IKO4",
            state: "#/serviceInfo/2",
            image: "./assets/icon/main4.jpg"
        }
    ];

    module.controller(rootControllerName, ['$scope', '$state', '$translate',
        function ($scope, $state, $translate) {
            $scope.data = {
                initBlocks: initBlocks,
                services: getServiceModel()
            };
            $scope.translate = function (langKey) {
                $translate.use(langKey);
                lang = langKey;
                $scope.data.services = getServiceModel();
            };
        }]);
    module.controller(emptyControllerName, ['$scope', '$state',
        function ($scope, $state) {
        }]);
    module.controller(serviceInfoName, ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            if (checkParam($stateParams.serviceID)) {
                var sid = parseInt($stateParams.serviceID, 10);
                $scope.data.service = sByID(sid).get(getServiceModel());
            }
        }]);
    module.controller(partnersControllerName, ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            $scope.data = {
                partners: partnersLogos
            };
        }]);
    module.controller(teamControllerName, ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            $scope.data = {
                team: team
            };
        }]);
    return {
        m: module,
        root: rootControllerName,
        empty: emptyControllerName,
        serviceInfo: serviceInfoName,
        team: teamControllerName,
        partners: partnersControllerName,
        name: moduleName
    };
});
