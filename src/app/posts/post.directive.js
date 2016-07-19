(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('post', poster());

  function poster() {
    var directive = {
      controller: PostController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/post.html',
      bindings: {
        post: '='
      }
    };
    return directive;
  }

  PostController.$inject = ['users', 'bleets', '$rootScope'];

  function PostController(users, bleets, $rootScope) {
    var vm = this;

    vm.editMode = false;
    vm.author = {};
    vm.edit = edit;
    vm.cancelEdit = cancelEdit;
    vm.delete = deletePost;
    vm.saveBleet = saveBleet;

    activate();

    /////////

    function activate() {
      users.getUser(vm.post.author)
        .then(setAuthorDataFromUser);
    }

    function setAuthorDataFromUser(user) {
      vm.author.name = user.fullName;
      vm.author.avatarUrl = user.avatarUrl;
      return user;
    }

    function edit() {
      vm.editMode = true;
    }

    function cancelEdit() {
      vm.editBleetForm.$setPristine();
      vm.editBleetForm.$setUntouched();

      turnOffEditMode();
    }

    function deletePost() {
      bleets.deleteBleet(vm.post.id).then(
        function(){
          $rootScope.$broadcast('bleetDeleted');
        }
      );
    }

    function saveBleet() {
      vm.post.text = vm.editBleetForm.text.value;

      bleets.updateBleet(vm.post.id, vm.post.text)
        .then(turnOffEditMode);
    }

    function turnOffEditMode() {
      vm.editMode = false;
    }

  }

})();

