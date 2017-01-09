'use strict';

(function (angular) {

  angular
    .module('app.clipboardModule')
    .factory('clipboard', clipboardFactory);

  clipboardFactory.$inject = [];

  function clipboardFactory() {
    var db = [];

    function get() {
      return db;
    }

    function isPresent(person) {
      return db.indexOf(person.id) !== -1;
    }

    function add(person) {
      if (!isPresent(person)) {
        db.push(person.id);
      }
    }

    function remove(person) {
      var i = db.indexOf(person.id);

      if (i !== -1) {
        db.splice(i, 1);
      }
    }

    function toggle(person) {
      if (isPresent(person)) {
        remove(person);
      } else {
        add(person);
      }
    }

    return {
      get: get,
      add: add,
      remove: remove,
      toggle: toggle,
      isPresent: isPresent
    };
  }

})(angular);