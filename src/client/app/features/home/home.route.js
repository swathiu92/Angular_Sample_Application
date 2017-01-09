(function() {
    'use strict';

    angular
        .module('app.home')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                'name': 'home',
                'config': {
                    url: '/',
                    templateUrl: 'app/features/home/home.html',
                    controller: 'HomeCtrl as vm',
                    title: 'home',
                    settings: {
                        nav: {
                            order: 1,
                            display: 'Home'
                        },
                        isOtherwiseState: true
                    }
                }
            }
        ];
    }
})();
