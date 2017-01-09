'use strict';

(function (angular) {

  angular
    .module('app.storeModule')
    .factory('person', personFactory);

  personFactory.$inject = ['$http'];

  function personFactory($http) {
    var url = '/api/person';

    function getCountries() {
        return $http
            .get('/api/countries')
            .then(function (response) {
                return response.data;
            });
    }
    function getTotalCount() {
        return getPersons().then(function (response){
            return response.total;
        });
    }

    function getPersons(page, size) {
        page = page || 1;
        size = size || 10;

        return $http
            .get(url + '?page=' + page)
            .then(function (response) {
				response.size = size;
                return response.data;
            });
    }

    function getPersonById(id) {
        return $http
            .get(url + '/' + id)
            .then(function (response) {
                return response.data;
            });
    }

    function updatePerson(person) {
      var method = (person.id === -1) ? 'POST' : 'PUT';
      var updateUrl = (person.id === -1) ? url : url + '/' + person.id;

      return $http(
          {
            url: updateUrl,
            method: method,
            data: person
          }
        ).then(function (response) {
          return response.data;
        });
    }

    function deletePerson(id) {
        return $http.delete({
            url: url + '/' + id
        });
    }

    return {
        getTotalCount: getTotalCount,
        getPersons: getPersons,
        getPersonById: getPersonById,
        deletePerson: deletePerson,
        updatePerson: updatePerson,
        getCountries: getCountries
    };
  }

})(angular);