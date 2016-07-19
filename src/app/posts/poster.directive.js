(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('poster', poster());

  function poster() {
    var directive = {
      controller: PosterController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/poster.html'
    };
    return directive;
  }

  PosterController.$inject = [];

  function PosterController() {
    
  }

})();
