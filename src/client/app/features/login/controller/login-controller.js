'use strict';

(function (angular) {

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams', '$state', 'sharedFactory'];

  function LoginController($stateParams, $state, sharedFactory) {
    var vm = this;
    vm.user = {};
    if($stateParams.registered) {
      vm.registered = true;
    }
    vm.login = function() {
      vm.submitted = true;
    if(vm.user.username !== 'user' || vm.user.password !== 'user') {
      vm.loginFailed = true;
    } else {
	  sharedFactory.setSharedData({
        loginSuccess: true
      }, "loginSuccess");
      $state.go('personList');
    }
    }
  }

})(angular);


