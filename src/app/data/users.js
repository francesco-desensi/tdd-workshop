(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .factory('users', users);

  users.$inject = ['$q'];
  function users($q) {
    var service = {};

    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;
    service.login = login;

    var currentUser = null;

    return service;

    ////////////////

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

