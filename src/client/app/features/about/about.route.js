(function() {
    'use strict';

    angular
        .module('app.about')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                'name': 'about',
                'config': {
                    url: '/about',
                    templateUrl: 'app/features/about/about.html',
                    controller: 'AboutCtrl as vm',
                    title: 'About',
                    settings: {
                        nav: {
                            order: 2,
                            display: 'About'
                        }
                    }
                }
            }
        ];
    }
})();
