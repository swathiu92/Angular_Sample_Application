(function() {
    'use strict';

    angular
        .module('app.core')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                'name': '404',
                'config': {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404',
                    settings: {
                        isOtherwiseState: false
                    }
                }
            }
        ];
    }
})();
