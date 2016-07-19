(function () {
  'use strict';

  describe('LoginController', function () {
    var vm;
    var $location;
    var users;
    var instantiateController;

    beforeEach(module('tddWorkshop'));

    beforeEach(inject(function ($controller) {
      $location = jasmine.createSpyObj('$location', ['path']);
      users = jasmine.createSpyObj('users', ['getCurrentUser', 'login']);

      instantiateController = function instantiateController() {
        vm = $controller('LoginController', {
          users: users,
          $location: $location
        });
      };
    }));

    describe('when the controller is instantiated', function () {
      describe('the current user', function () {
        it('is retrieved', function () {
          instantiateController();

          expect(users.getCurrentUser.calls.count()).toBe(1);
        });
      });

      describe('$location.path', function () {
        it('is set to "/" if getCurrentUser() returns an object', function () {
          users.getCurrentUser.and.returnValue({});
          instantiateController();

          expect($location.path.calls.count()).toBe(1);
          expect($location.path.calls.argsFor(0)).toEqual(['/']);
        });

        it('should not be set if getCurrentUser() returns falsey', function () {
          users.getCurrentUser.and.returnValue(undefined);
          instantiateController();

          expect($location.path.calls.count()).toBe(0);
        });
      });

      describe('authenicationFailure', function () {
        it('is set to false by default', function () {
          instantiateController();

          expect(vm.authenicationFailure).toBe(false);
        });
      });
    });

    describe('when method', function () {
      beforeEach(function () {
        instantiateController();
      });

      describe('login() is called', function () {
        var $rootScope;

        beforeEach(inject(function ($injector) {
          $rootScope = $injector.get('$rootScope');
        }));

        describe('and succeeds', function () {
          var user;
          beforeEach(inject(function ($injector) {
            var $q = $injector.get('$q');

            user = {
              id: 1,
              username: 'bigmike',
              fullName: 'Big Mike'
            };

            users.login.and.returnValue($q.when(user));
          }));

          it('sets the $location.path to "/" when the login is successful', function () {
            vm.login(user.username);
            $rootScope.$apply();

            expect($location.path.calls.count()).toBe(1);
            expect($location.path.calls.argsFor(0)).toEqual(['/']);
          });

          it('clears any authentication failures', function () {
            vm.login(user.username);
            $rootScope.$apply();

            expect(vm.authenicationFailure).toBe(false);
          });
        });

        describe('and fails', function () {
          beforeEach(inject(function ($injector) {
            var $q = $injector.get('$q');

            users.login.and.returnValue($q.reject());
          }));

          it('sets the authentication failures', function () {
            vm.login('bigmike');
            $rootScope.$apply();

            expect(vm.authenicationFailure).toBe(true);
          });
        });
      });

    });

  });
})();
