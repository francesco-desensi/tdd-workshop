(function () {
  'use strict';

  angular
    .module('tddWorkshop.components')
    .directive('navbar', navbar);

  navbar.$inject = [];

  function navbar() {
    var directive = {
      controller: NavbarController,
      controllerAs: 'vm',
      templateUrl: 'app/components/navbar.directive.html',
      restrict: 'E',
      scope: {}
    };
    return directive;
  }

  NavbarController.$inject = [];

  function NavbarController() {

  }

})();

