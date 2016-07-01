(function() {
  'use strict';

  angular
    .module('tddWorkshop')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
