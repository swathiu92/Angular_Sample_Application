(function() {
    'use strict';

    angular
        .module('app.login')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
      return [
        {
          name: 'login',
          config: {
            url: '/login?registered',
            templateUrl: 'app/features/login/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
    ];
    }
})();
