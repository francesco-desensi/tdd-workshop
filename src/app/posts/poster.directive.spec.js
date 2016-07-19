(function () {
  'use strict';

  describe('<poster>', function () {
    var vm;
    var bleets;
    var $rootScope;

    beforeEach(module('tddWorkshop.posts'));

    var scope;
    beforeEach(inject(function ($injector) {
      bleets = $injector.get('bleets');

      $rootScope = $injector.get('$rootScope');
      scope = $rootScope.$new();
      scope.bleet = {
        text: 'test'
      };
      scope.createBleetForm = jasmine.createSpyObj('createBleetForm', ['$setPristine', '$setUntouched']);

      vm = $injector.get('$componentController')('poster', {$scope: scope});
    }));

    describe('when component is compiled', function () {
      describe('bleet failure', function () {
        it('defaults to false', function () {
          expect(vm.bleetFailure).toBe(false);
        });
      });
    });

    describe('when method', function () {

      describe('createBleetOnSubmit() is called', function () {
        describe('when it is called with valid data', function () {
          var newPost;
          var deferred;

          beforeEach(inject(function ($q) {
            newPost = {
              text: 'This is a test bleet yo!'
            };
            deferred = $q.defer();
            spyOn(bleets, 'createBleet').and.returnValue(deferred.promise);
          }));

          it('should create a new bleet via the bleet service', function () {
            vm.createBleetOnSubmit(newPost);
            expect(bleets.createBleet.calls.count()).toBe(1);
          });

          describe('and when the request succeeds', function () {
            var scope;
            beforeEach(inject(function () {
              spyOn(vm, 'notifyOnBleetCreationSuccess');
            }));

            it('should notify other components that the post has succeeded', function () {
              vm.createBleetOnSubmit(newPost);
              deferred.resolve({status: 201});
              $rootScope.$apply();
              expect(vm.notifyOnBleetCreationSuccess.calls.count()).toBe(1);
            });
          });

          describe('and when the request fails', function () {
            beforeEach(function () {
              spyOn(vm, 'notifyOnBleetCreationFailure');
            });

            it('should notify other components that the post has failed', function () {
              vm.createBleetOnSubmit(newPost);
              deferred.reject({
                status: 400,
                data: {
                  error: 'The test call failed!'
                }
              });
              $rootScope.$apply();

              expect(vm.notifyOnBleetCreationFailure.calls.count()).toBe(1);
            });
          });
        });

        describe('when the service fails', function () {
          beforeEach(inject(function ($q) {
            spyOn(bleets, 'createBleet').and.returnValue($q.reject());
          }));

          it('sets the bleet failure to true', function () {
            vm.createBleetOnSubmit({});
            $rootScope.$apply();

            expect(vm.bleetFailure).toBe(true);
          });
        });
      });

      describe('notifyOnBleetCreationSuccess() is called', function () {
        beforeEach(function () {
          spyOn($rootScope, '$broadcast');
        });

        describe('when it is called', function () {
          it('should broadcast an event from the root scope', function () {
            vm.notifyOnBleetCreationSuccess();
            expect($rootScope.$broadcast.calls.count()).toBe(1);
            expect($rootScope.$broadcast.calls.argsFor(0)).toEqual(['newBleetPosted']);
          });
        });
      });

    });

  });
})();
