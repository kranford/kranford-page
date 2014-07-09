define([
    'utils/Logger',
    'angular',
    'angular-ui-router',
    'capabilities/kranfordController',
    "text!template/layout/main.html",
    "text!template/partials/empty.html",
    "text!template/partials/test.content.html",
    "text!template/partials/mainMenu.html",
    "text!template/service/service.main.html",
    "text!template/service/service.info.html",
    "text!template/contact.html",
    "text!template/team.html",
    "text!template/partners.html",
    "text!template/about.html",
    "text!template/init.html"
],
    function (logger, angular, uiroute, kranfordController, main_layout, empty_template, test_content, main_menu_template, service_main, service_info, contact_template, team_template, partners_template, about_template, init_template) {
        var moduleName = 'mainAppRouting';
        var module = angular.module(moduleName, ['ui.router', kranfordController.name]);
        module.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('main', {
                    url: "/",
                    abstract: true,
                    controller: kranfordController.root,
                    template: main_layout
                })
                .state('main.init', {
                    url: "init",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: init_template,
                            controller: kranfordController.empty
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.about', {
                    url: "about",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: about_template,
                            controller: kranfordController.empty
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.service', {
                    url: "service",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: service_main,
                            controller: kranfordController.serviceInfo
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.serviceInfo', {
                    url: "serviceInfo/{serviceID:[0-9]{1,4}}",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: service_info,
                            controller: kranfordController.serviceInfo
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.partners', {
                    url: "partners",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: partners_template,
                            controller: kranfordController.partners
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.team', {
                    url: "team",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: team_template,
                            controller: kranfordController.team
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                })
                .state('main.contact', {
                    url: "contact",
                    views: {
                        "header": {
                            template: main_menu_template
                        },
                        "contentView": {
                            template: contact_template,
                            controller: kranfordController.empty
                        },
                        "footer": {
                            template: empty_template
                        }
                    }
                });
        }]);
        return {
            m: module,
            name: moduleName
        };
    });