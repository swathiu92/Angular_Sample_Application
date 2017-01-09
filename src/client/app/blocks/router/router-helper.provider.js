(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        this.setHtml5Mode = function (flag) {
            $locationProvider.html5Mode(!!flag);
        }

        this.$get = $get;

        $get.$inject = ['$state'];

        function $get ($state) {
            var isOtherwiseSet = false;

            function configureStates (states) {
                angular.forEach(states, function(state) {
                    var otherwise = state.config.settings && state.config.settings.isOtherwiseState;

                    $stateProvider.state(state.name, state.config);

                    if (otherwise && !isOtherwiseSet) {
                        isOtherwiseSet = true;
                        $urlRouterProvider.otherwise(state.config.url);
                    }
                });

            }

            function getStates () {
                return $state.get();
            }

            return {
                getStates: getStates,
                configureStates: configureStates
            };
        }
    }
})();
