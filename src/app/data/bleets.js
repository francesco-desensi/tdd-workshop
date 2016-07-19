(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .factory('bleets', bleets);

  bleets.$inject = ['$http', '$q', 'users', 'dataConstants'];

  function bleets($http, $q, users, dataConstants) {
    var service = {};

    service.getAllBleets = getAllBleets;
    service.createBleet = createBleet;
    service.updateBleet = updateBleet;
    service.deleteBleet = deleteBleet;

    var bleetsUri = [dataConstants.BASE_URL, dataConstants.BLEETS].join('/');

    return service;

    ////////////////

    function getAllBleets() {
      return $http.get(bleetsUri).then(resolveWithData);
    }

    function createBleet(text) {
      var author = userToUserUri(users.getCurrentUser());
      return $http.post(bleetsUri, {text: text, author: author}).then(angular.noop);
    }

    function resolveWithData(response) {
      return $q.when(response.data);
    }

    function userToUserUri(user) {
      return [dataConstants.BASE_URL, dataConstants.USERS, user.id].join('/');
    }

    function updateBleet(id, text) {
      return $http.patch([bleetsUri, id].join('/'), {text: text});
    }

    function deleteBleet(id){
      return $http.delete([bleetsUri, id].join('/'));
    }
  }

})();

