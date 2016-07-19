(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('feed', feed());

  function feed() {
    var directive = {
      controller: FeedController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/feed.html'
    };
    return directive;
  }

  FeedController.$inject = ['bleets', '$scope'];

  function FeedController(bleets, $scope) {
    var vm = this;

    vm.bleets = null; //list of bleets
    vm.hasError = false; //error status

    vm.updateFeed = function(){
      bleets.getAllBleets().then(bindBleets, setError);
    };

    activate();

    function activate() {
      vm.updateFeed();
      $scope.$on('newBleetPosted', vm.updateFeed);
    }

    function bindBleets(bleets) {
      vm.bleets = bleets;
    }

    function setError() {
      vm.hasError = true;
    }
  }

})();

