(function() {
  'use strict';

  angular
    .module('tddWorkshop')
    .controller('MainController', MainController);

  MainController.$inject = [];

  function MainController() {
    console.log('ctrl')
  }
})();
