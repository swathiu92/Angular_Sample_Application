(function () {
    'use strict';

    angular.module('app.home').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [];

    function HomeCtrl () {
        var vm = this;
        vm.title = 'TryAngular';
    }

})();
