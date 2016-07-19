(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .factory('users', users);

  users.$inject = ['$q', '$http'];
  function users($q, $http) {
    var service = {};

    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;
    service.login = login;
    service.getUser = getUser;

    var currentUser = null;

    return service;

    ////////////////

    function getUser(link) {
      return $http.get(link)
        .then(resolveWithData);
    }

    function resolveWithData(response) {
      return $q.when(response.data);
    }

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
    }

    function login() {
      //instead of going to the server, for now, just return a default user

      var defaultUser = {
        id: 1,
        username: 'bigmike',
        fullName: 'Big Mike'
      };

      service.setCurrentUser(defaultUser);

      return $q.when({status: 200, data: defaultUser});
    }

  }
})();

