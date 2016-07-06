(function() {
  'use strict';

  describe('<navbar>', function(){
    var vm;

    beforeEach(module('tddWorkshop.components'));

    beforeEach(inject(function($rootScope, $compile) {
      vm = $compile('<navbar></navbar>')($rootScope.$new()).controller();
    }));
    
    
    
  });
})();
