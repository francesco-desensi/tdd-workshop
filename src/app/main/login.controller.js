(function () {
  'use strict';

  angular
    .module('tddWorkshop')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['users', '$location'];

  function LoginController(users, $location) {
    var vm = this;

    vm.login = login;

    activate();

    function activate() {
      if (users.getCurrentUser()) {
        goToRoot();
      }
    }

    function login() {
      users.login().then(goToRoot);
    }

    function goToRoot() {
      $location.path('/');
    }
  }
})();
