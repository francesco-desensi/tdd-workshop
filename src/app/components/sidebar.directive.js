(function () {
  'use strict';

  angular
    .module('tddWorkshop.components')
    .component('sidebar', sidebar());

  function sidebar() {
    var directive = {
      controller: SidebarController,
      controllerAs: 'vm',
      templateUrl: '/app/components/sidebar.html'
    };
    return directive;
  }

  SidebarController.$inject = ['users'];

  function SidebarController(users) {
    var vm = this;

    vm.user = null;

    activate();

    ///////

    function activate() {
      vm.user = users.getCurrentUser();
    }
  }

})();

