(function () {
  'use strict';

  angular
    .module('tddWorkshop')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['users', '$location'];

  function LoginController(users, $location) {
    var vm = this;

    vm.authenicationFailure = false; //login failure
    vm.username = undefined;
    vm.login = login;

    activate();

    function activate() {
      if (users.getCurrentUser()) {
        goToRoot();
      }
    }

    function login(username) {
      users.login()
        .then(clearError)
        .then(goToRoot)
        .catch(setError);
    }

    function goToRoot() {
      $location.path('/');
    }

    function clearError() {
      vm.authenicationFailure = false;
    }

    function setError() {
      vm.authenicationFailure = true;
    }
  }
})();
