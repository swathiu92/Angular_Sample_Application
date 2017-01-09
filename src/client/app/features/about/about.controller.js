(function () {
    'use strict';

    angular.module('app.about').controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = [];

    function AboutCtrl () {
        var vm = this;

        vm.technologies = ['GulpJs', 'AngularJs'];
    }

})();
