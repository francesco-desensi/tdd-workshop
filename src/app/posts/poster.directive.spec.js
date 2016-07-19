(function () {
  'use strict';

  describe('<poster>', function () {
    var vm;
    var bleets;
    var instantiateController;
    var bleetsData;
    var $rootScope;

    beforeEach(module('tddWorkshop.posts'));

    var scope;
    beforeEach(inject(function ($injector, _$rootScope_) {
      bleets = $injector.get('bleets');

      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      scope.bleet = {
        text: "test"
      };
      scope.createBleetForm = {
        $setPristine: function(){},
        $setUntouched: function(){}
      };

      vm = $injector.get('$componentController')('poster', {$scope: scope});
    }));

    describe('createBleetOnSubmit', function(){
      describe('when it is called with valid data', function(){
        var newPost;
        var $q;
        var deferred;

        beforeEach(inject(function (_$q_) {
          $q = _$q_;
          newPost = {
            text: "This is a test bleet yo!"
          };
          deferred = $q.defer();
          spyOn(bleets, 'createBleet').and.returnValue(deferred.promise);
        }));

        it('should create a new bleet via the bleet service', function(){
          vm.createBleetOnSubmit(newPost);
          expect(bleets.createBleet.calls.count()).toBe(1);
        });

        describe('and when the request succeeds', function(){
          var scope;
          beforeEach(inject(function () {
            spyOn(vm, 'notifyOnBleetCreationSuccess');
          }));

          it('should notify other components that the post has succeeded', function(){
            vm.createBleetOnSubmit(newPost);
            deferred.resolve({status:201});
            $rootScope.$apply();
            expect(vm.notifyOnBleetCreationSuccess.calls.count()).toBe(1);
          });
        });

        describe('and when the request fails', function(){
          beforeEach(function () {
            spyOn(vm, 'notifyOnBleetCreationFailure');
          });

          it('should notify other components that the post has failed', function(){
            vm.createBleetOnSubmit(newPost);
            deferred.reject({
              status: 400,
              data: {
                error: "The test call failed!"
              }
            });
            $rootScope.$apply();

            expect(vm.notifyOnBleetCreationFailure.calls.count()).toBe(1);
          });
        });
      });
    });

    describe('notifyOnBleetCreationSuccess', function(){
      beforeEach(function () {
        spyOn($rootScope, '$broadcast');
      });

      describe('when it is called', function(){
        it('should broadcast an event from the root scope', function(){
          vm.notifyOnBleetCreationSuccess();
          expect($rootScope.$broadcast).toHaveBeenCalledWith('newBleetPosted');
        });
      });
    });
    
  });
})();
