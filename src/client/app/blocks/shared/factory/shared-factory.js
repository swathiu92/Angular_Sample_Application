'use strict';

(function (angular) {

  angular
    .module('app.sharedModule')
    .factory('sharedFactory', sharedFactory);

  sharedFactory.$inject = [];

  function sharedFactory() {
    var dataObject = {};

      function getSharedData(){
        return dataObject;
      }

      function getSharedDataForKey(key){
        return dataObject[key];
      }

      function setSharedData(data,key){
        dataObject[key]=data[key];
      }

      function setSharedDataForKey(data,key){
        dataObject[key]=data;
      }

      var service = {
        getSharedData : getSharedData,
        setSharedData : setSharedData,
        getSharedDataForKey : getSharedDataForKey,
        setSharedDataForKey:setSharedDataForKey
      };

      return service;
  }

})(angular);