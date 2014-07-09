(function () {
    "use strict";
    require.config({
        paths: {
            'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
            'angular': 'vendor/angular/angular',
            'angular-translate': 'vendor/angular-translate/angular-translate',
            'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
            'text': 'vendor/requirejs-text/text',
            'requireLib': 'vendor/requirejs/require',
            'jquery': 'vendor/jquery/jquery',
            'holderjs': 'vendor/holderjs/holder',
            'underscore': 'vendor/underscore/underscore',
            'underscore.string': 'vendor/underscore.string/lib/underscore.string',
            'has': 'vendor/has/has',
            'marked': 'vendor/marked/lib/marked'
        },
        shim: {
            angular: {
                exports: "angular"
            },
            "angular-ui-router": {
                deps: ["angular"]
            },
            "angular-translate": {
                deps: ["angular"]
            },
            "bootstrap": {
                deps: ["jquery"]
            },
            "underscore.string": {
                deps: ["underscore"]
            }
        },
        urlArgs: "bust=" + (new Date()).getTime(),
        waitSeconds: 150
    });

    require(['AppInjector', 'angular', 'bootstrap'], function (App) {
        App.appBootstrap();

        return {};
    });
}());