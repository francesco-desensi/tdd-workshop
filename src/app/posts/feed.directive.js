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

  FeedController.$inject = ['bleets'];

  function FeedController(bleets) {
    var vm = this;

    vm.bleets = null; //list of bleets
    vm.hasError = false; //error status

    activate();

    ///////////

    function activate() {
      bleets.getAllBleets().then(bindBleets, setError);
    }

    function bindBleets(bleets) {
      vm.bleets = bleets;
    }

    function setError() {
      vm.hasError = true;
    }
  }

})();

