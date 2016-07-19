(function () {
  'use strict';

  angular
    .module('tddWorkshop.components')
    .component('navbar', navbar());

  navbar.$inject = [];

  function navbar() {
    var directive = {
      templateUrl: 'app/components/navbar.directive.html'
    };
    return directive;
  }
})();

