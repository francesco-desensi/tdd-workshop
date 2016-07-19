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

  PosterController.$inject = ['bleets', '$scope'];

  function PosterController(bleets, $scope) {
    var vm = this;

    vm.bleetFailure = false;
    vm.createBleetOnSubmit = createBleetOnSubmit;
    vm.notifyOnBleetCreationSuccess = notifyOnBleetCreationSuccess;
    vm.notifyOnBleetCreationFailure = notifyOnBleetCreationFailure;
    vm.resetForm = resetForm;

    ///////
    
    function resetForm() {
      $scope.bleet = {};
      $scope.createBleetForm.$setPristine();
      $scope.createBleetForm.$setUntouched();
    }

    function createBleetOnSubmit(bleet) {
      bleets.createBleet(bleet.text)
        .then(bleetCreationSucceeded, vm.notifyOnBleetCreationFailure);
    }
    
    function bleetCreationSucceeded(response) {
      vm.notifyOnBleetCreationSuccess(response.data);
      vm.resetForm();
    }

    function notifyOnBleetCreationSuccess() {
      $scope.$root.$broadcast('newBleetPosted');
    }

    function notifyOnBleetCreationFailure() {
      vm.bleetFailure = true;
    }
  }

})();

