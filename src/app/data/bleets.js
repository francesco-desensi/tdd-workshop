(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .factory('bleets', bleets);

  bleets.$inject = ['$http', '$q', 'dataConstants'];

  function bleets($http, $q, dataConstants) {
    var service = {};

    service.getAllBleets = getAllBleets;
    service.createBleet = createBleet;

    var bleetsUri = [dataConstants.BASE_URL, dataConstants.BLEETS].join('/');

    return service;

    ////////////////

    function getAllBleets() {
      return $http.get(bleetsUri).then(resolveWithData);
    }

    function createBleet(text) {
      return $http.post(bleetsUri, {text: text}).then(resolveWithData);
    }

    function resolveWithData(response) {
      return $q.when(response.data);
    }
  }

})();

