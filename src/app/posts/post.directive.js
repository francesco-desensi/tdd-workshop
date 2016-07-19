(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('post', poster());

  function poster() {
    var directive = {
      controller: PosterController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/post.html',
      bindings: {
        post: '='
      }
    };
    return directive;
  }

  PosterController.$inject = ['users'];

  function PosterController(users) {
    var vm = this;

    vm.editMode = false;
    vm.authorName = null;
    vm.edit = edit;
    vm.delete = deletePost;

    activate();

    /////////

    function activate() {
      users.getUser(vm.post.author)
        .then(setAuthorFromUser);
    }

    function setAuthorFromUser(user) {
      vm.authorName = user.fullName;
    }

    function edit() {
      vm.editMode = true;
    }

    function deletePost() {

    }
  }

})();

