(function () {
  'use strict';

  angular
    .module('tddWorkshop.components')
    .component('navbar', navbar());

  navbar.$inject = [];

  function navbar() {
    var directive = {
      controller: NavbarController,
      controllerAs: 'vm',
      templateUrl: 'app/components/navbar.directive.html',
      scope: {}
    };
    return directive;
  }

  NavbarController.$inject = [];

  function NavbarController() {

  }

})();

