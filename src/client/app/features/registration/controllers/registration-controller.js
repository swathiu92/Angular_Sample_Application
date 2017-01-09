'use strict';

(function (angular) {

  angular
    .module('app.registration')
    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$state', 'person'];

  function RegistrationController($state, person) {
    var vm = this;
    vm.datepicker = { opened: false };

    vm.openDatepicker = function() {
      vm.datepicker.opened = true;
    };

	person.getCountries().then(function (response) {
      vm.countries = response.payload;
    });

    vm.format = 'dd-MMMM-yyyy';

    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.user = {};
    vm.user.gender = '';

    vm.register = function(registrationForm) {
      vm.submitted = true;
      if(registrationForm.$valid && (vm.user.password === vm.user.confirmPassword)) {
          $state.go('login', {'registered':true});
      }
    }
  }

})(angular);
