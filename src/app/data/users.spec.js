(function () {
  'use strict';

  describe('users', function () {
    var users;
    var expectedUser;
    var $http, $httpBackend, $rootScope;

    beforeEach(module('tddWorkshop.data'));

    beforeEach(inject(function ($injector) {
      users = $injector.get('users');
      $http = $injector.get('$http');
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');

      expectedUser = {
        id: 1,
        username: 'bigmike',
        fullName: 'Big Mike'
      };
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when method', function () {
      describe('login() is called', function () {
        it('always resolves with a user object and status 200', function () {
          var user = null;
          var status = null;
          users.login().then(function (response) {
            status = response.status;
            user = response.data;
          });
          $rootScope.$apply();

          expect(status).toBe(200);
          expect(user).toEqual(expectedUser);
        });

        it('sets the current user to the user that is retrieved', function () {
          spyOn(users, 'setCurrentUser');

          users.login();

          expect(users.setCurrentUser).toHaveBeenCalledWith(expectedUser);
        });
      });

      describe('getCurrentUser() is called', function () {
        it('retrieves a null value by default', function () {
          expect(users.getCurrentUser()).toBeNull();
        });

        it('retrieves a value after it\'s set', function () {
          users.setCurrentUser(expectedUser);

          expect(users.getCurrentUser()).toEqual(expectedUser);
        });
      });

      describe('setCurrentUser() is called', function () {
        it('sets the value that is passed in', function () {
          var user = {};
          users.setCurrentUser(user);

          expect(users.getCurrentUser()).toBe(user);
        });
      });

      describe('getUser() is called', function () {
        it('makes a GET request to the link provide', function () {
          var link = '/api/users/0';
          var expectedUser = {fullName: 'A Name'};
          $httpBackend.expect('GET', link).respond(200, expectedUser);

          users.getUser(link);
          $httpBackend.flush();
        });

        it('resolves with the expectedUser provided', function () {
          var link = '/api/users/0';
          var expectedUser = {fullName: 'A Name'};
          $httpBackend.expect('GET', link).respond(200, expectedUser);

          var user = null;
          users.getUser(link).then(function(data){
            user = data;
          });
          $httpBackend.flush();

          expect(user).toEqual(expectedUser);
        });
      });
    });
  });
})();
