(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',

        'app.storeModule',
        'app.clipboardModule',
        'app.ratingsModule',

        'app.layout',
        'app.home',
        'app.about',
        'app.person',
		'app.registration',
		'app.login',
		'app.sharedModule',
		'ui.bootstrap',
		'ngToast'
    ]);

})();
