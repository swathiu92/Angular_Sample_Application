(function() {
    'use strict';

    var pageHeader = {
        templateUrl: 'app/layout/page-header.template.html',
        controller: ['routerHelper', function (routerHelper) {
            var vm = this;

            vm.states = routerHelper.getStates().filter(function (state) {
                return state.settings && angular.isObject(state.settings.nav);
            });

            vm.states.sort(function (a, b) {
                return a.settings.nav.order > b.settings.nav.order;
            });
        }]
    };

    angular.module('app.layout').component('pageHeader', pageHeader);

})();
