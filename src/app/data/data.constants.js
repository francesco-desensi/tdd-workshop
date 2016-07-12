(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .constant('dataConstants', dataConstants());

  function dataConstants() {
    return {
      BASE_URL: '/api',
      BLEETS: 'bleets'
    };
  }
  
})();