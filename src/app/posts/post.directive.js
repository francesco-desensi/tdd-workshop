(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('post', poster());

  function poster() {
    var directive = {
      controller: PosterController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/post.html'
    };
    return directive;
  }

  PosterController.$inject = [];

  function PosterController() {
    
  }

})();

