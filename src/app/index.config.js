(function () {
  'use strict';

  angular
    .module('tddWorkshop')
    .config(config);

  config.$inject = ['$logProvider', '$routeProvider', 'toastrConfig'];

  function config($logProvider, $routeProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(false);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $routeProvider
      .when('/', {
        controller: 'MainController',
        controllerAs: 'vm',
        templateUrl: 'app/main/main.html'
      })
      .otherwise('/');

    console.log('config')
  }

})();
