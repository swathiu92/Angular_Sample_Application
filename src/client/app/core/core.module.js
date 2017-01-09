(function () {
    'use strict';

    angular
        .module('app.core', [
            //Angular modules
            'ngMessages',
            'ngResource',

            //Third party modules
            'ui.router',

            //Custom modules
            'blocks.router'
        ]);
})();
