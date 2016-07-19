(function () {
  'use strict';

  describe('<feed>', function () {
    var vm;
    var bleets;
    var instantiateController;
    var bleetsData;
    var $rootScope;
    var scope;

    beforeEach(module('tddWorkshop.posts'));

    beforeEach(inject(function ($injector, _$rootScope_) {
      bleets = $injector.get('bleets');
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      instantiateController = function compileDirective() {
        vm = $injector.get('$componentController')('feed', {$scope: scope});
      };
    }));

    beforeEach(function () {
      bleetsData = [
        {
          id: 1,
          postDate: new Date(1466791000000).toJSON(),
          text: 'Have you guys seen the John Papa Style Guide?! #socool',
          author: '/api/users/2'
        },
        {
          id: 2,
          postDate: new Date(1466792000000).toJSON(),
          text: 'Way better than that pizza I had last night #theworst',
          author: '/api/users/3'
        },
        {
          id: 3,
          postDate: new Date(1466793000000).toJSON(),
          text: 'Worse than high school cafeteria pizza? #inquiringminds #enquiringminds',
          author: '/api/users/1'
        },
        {
          id: 4,
          postDate: new Date(1466794000000).toJSON(),
          text: 'Yes #makesmemisspizzaboats',
          author: '/api/users/3'
        },
        {
          id: 5,
          postDate: new Date(1466795000000).toJSON(),
          text: 'Ahem, yes, that style guide is good stuff #checkitout',
          author: '/api/users/1'
        },
        {
          id: 6,
          postDate: new Date(1466795000000).toJSON(),
          text: 'Ahem, yes, that style guide is good stuff #checkitout',
          author: '/api/users/1'
        }
      ];
    });

    describe('on compilation', function () {
      var $q;

      beforeEach(inject(function (_$q_) {
        $q = _$q_;
        spyOn(bleets, 'getAllBleets').and.returnValue($q.when());
      }));

      it('defaults the error status to false', function () {
        instantiateController();

        expect(vm.hasError).toBe(false);
      });

      it('listens for new post events', function(){
        spyOn(scope, '$on');
        instantiateController();
        expect(scope.$on).toHaveBeenCalledWith('newBleetPosted', vm.updateFeed);
      });

      describe('tries to retrieve bleets', function () {
        beforeEach(inject(function (_$rootScope_) {
          $rootScope = _$rootScope_;
        }));

        it('by calling the bleets service', function () {
          instantiateController();

          expect(bleets.getAllBleets.calls.count()).toBe(1);
        });

        describe('and is successful', function () {
          beforeEach(function () {
            bleets.getAllBleets.and.returnValue($q.when(bleetsData));
          });

          it('binds returned data to the view model', function () {
            instantiateController();
            $rootScope.$apply();

            expect(vm.bleets).toBe(bleetsData);
          });

          it('sets the error status to false', function () {
            instantiateController();
            $rootScope.$apply();

            expect(vm.hasError).toBe(false);
          });
        });

        describe('and fails', function () {
          beforeEach(inject(function () {
            bleets.getAllBleets.and.returnValue($q.reject({status: 500, data: 'internal error'}));
          }));

          it('sets the error status to true', function () {
            instantiateController();
            $rootScope.$apply();

            expect(vm.bleets).toBe(null);
            expect(vm.hasError).toBe(true);
          });
        });
      });
    });
  });
})();
