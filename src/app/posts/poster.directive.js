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

  PosterController.$inject = ['bleets', '$rootScope', '$scope'];

  function PosterController(bleets, $rootScope, $scope) {
    var vm = this;

    vm.createBleetOnSubmit = function(bleet){
      var promise = bleets.createBleet(bleet.text);

      promise.then(function(response){
        vm.notifyOnBleetCreationSuccess(response.data);
        vm.resetForm(bleet);
      }, function(reason){
        vm.notifyOnBleetCreationFailure(reason);
      });
    };

    vm.notifyOnBleetCreationSuccess = function(bleet){
      $rootScope.$broadcast('newBleetPosted');
    };

    vm.notifyOnBleetCreationFailure = function(error){
    };

    vm.resetForm = function(){
      $scope.bleet = {};
      $scope.createBleetForm.$setPristine();
      $scope.createBleetForm.$setUntouched();
    }
  }

})();

