'use strict';

(function (angular) {

  angular
    .module('app.ratingsModule')
    .directive('ratings', ratingsDirective);

  function ratingsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/blocks/ratings/template/ratings-template.html',
      scope: {
        value: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: ratingsController
    };

    function ratingsController () {
      this.getWidth = function () {
        return {
          width: (+this.value) * 86 / 5,
          overflow: 'hidden'
        };
      };
    }
  }

})(angular);