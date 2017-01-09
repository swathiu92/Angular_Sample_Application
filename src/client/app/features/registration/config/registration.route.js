(function() {
    'use strict';

    angular
        .module('app.registration')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
      return [
        {
          name: 'registration',
          config: {
            url: '/registration',
            templateUrl: 'app/features/registration/templates/registration.html',
            controller: 'RegistrationController',
            controllerAs: 'vm'
          }
        }
    ];
    }
})();
