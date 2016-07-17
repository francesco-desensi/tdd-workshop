(function () {
  'use strict';

  describe('controllers', function () {
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

    describe('on instantiation', function () {
      it('should get the current user', function () {
        instantiateController();

        expect(users.getCurrentUser.calls.count()).toBe(1);
      });

      it('should set $location.path to "/" if getCurrentUser() returns an object', function () {
        users.getCurrentUser.and.returnValue({});
        instantiateController();

        expect($location.path.calls.count()).toBe(1);
        expect($location.path.calls.argsFor(0)).toEqual(['/']);
      });

      it('should not alter $location.path when getCurrentUser() returns falsey', function () {
        users.getCurrentUser.and.returnValue(undefined);
        instantiateController();

        expect($location.path.calls.count()).toBe(0);
      });
    });

    describe('Bindable Members', function () {
      beforeEach(function () {
        instantiateController();
      });

      describe('login()', function () {
        var $rootScope;

        beforeEach(inject(function ($injector) {
          $rootScope = $injector.get('$rootScope');
          var $q = $injector.get('$q');

          var user = {
            id: 1,
            username: 'bigmike',
            fullName: 'Big Mike'
          };

          users.login.and.returnValue($q.when({status: 200, data: user}));
        }));

        it('calls the users.login method', function () {
          vm.login();

          expect(users.login.calls.count()).toBe(1);
        });

        it('sets the $location.path to "/" when the login is successful', function () {
          vm.login();
          $rootScope.$apply();

          expect($location.path.calls.count()).toBe(1);
          expect($location.path.calls.argsFor(0)).toEqual(['/']);
        });
        
      });
    });

  });
})();
