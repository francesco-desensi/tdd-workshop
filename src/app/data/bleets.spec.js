(function () {
  'use strict';

  describe('bleets', function () {
    var bleets, users;
    var $http, $httpBackend;

    beforeEach(module('tddWorkshop.data'));

    beforeEach(inject(function ($injector) {
      bleets = $injector.get('bleets');
      users = $injector.get('users');
      $http = $injector.get('$http');
      $httpBackend = $injector.get('$httpBackend');

      spyOn(users, 'getCurrentUser').and.returnValue({id: 1});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAllBleets()', function () {
      var bleetsFromServer;
      beforeEach(function () {
        bleetsFromServer = ['thing1', 'thing2'];
      });

      it('calls the correct endpoint', function () {
        $httpBackend.expectGET('/api/bleets').respond(200, bleetsFromServer);

        bleets.getAllBleets();

        $httpBackend.flush();
      });

      it('returns the data that the endpoint responded with', function () {
        $httpBackend.expectGET('/api/bleets').respond(200, bleetsFromServer);

        var promise = bleets.getAllBleets();
        var resolvedValue = null;
        promise.then(function (data) {
          resolvedValue = data;
        });

        $httpBackend.flush();
        expect(resolvedValue).toEqual(bleetsFromServer);
      });

      it('rejects with the response object from $http when call fails', function () {
        $httpBackend.expectGET('/api/bleets').respond(500, 'internal error');

        var promise = bleets.getAllBleets();
        var reason = null;
        promise.catch(function (data) {
          reason = data;
        });

        $httpBackend.flush();
        expect(reason.status).toBe(500);
        expect(reason.data).toBe('internal error');
      });
    });

    describe('createBleet()', function () {
      it('calls the correct endpoint with the right data', function () {
        $httpBackend.expectPOST('/api/bleets', {text: 'bleetText', author: '/api/users/1'}).respond(201);

        bleets.createBleet('bleetText');

        $httpBackend.flush();
      });

      it('gets current user from users service', function () {
        $httpBackend.expectPOST('/api/bleets', {text: 'bleetText', author: '/api/users/1'}).respond(201);

        var promise = bleets.createBleet('bleetText');
        var resolvedValue = null;
        promise.then(function (data) {
          resolvedValue = data;
        });

        $httpBackend.flush();
        expect(users.getCurrentUser.calls.count()).toBe(1);
      });

      it('returns no data', function () {
        $httpBackend.expectPOST('/api/bleets', {text: 'bleetText', author: '/api/users/1'}).respond(201);

        var promise = bleets.createBleet('bleetText');
        var resolvedValue = null;
        promise.then(function (data) {
          resolvedValue = data;
        });

        $httpBackend.flush();
        expect(resolvedValue).toBeUndefined();
      });

      it('rejects with the response object from $http when call fails', function () {
        $httpBackend.expectPOST('/api/bleets').respond(500, 'internal error');

        var promise = bleets.createBleet();
        var reason = null;
        promise.catch(function (data) {
          reason = data;
        });

        $httpBackend.flush();
        expect(reason.status).toBe(500);
        expect(reason.data).toBe('internal error');
      });
    });

    describe('updateBleet()', function () {
      it('makes a PATCH request for the bleet that was edited', function () {
        $httpBackend.expect('PATCH', '/api/bleets/0', {text: 'new bleet text'}).respond(200);

        bleets.updateBleet(0, 'new bleet text');
        $httpBackend.flush();
      });
    });

    describe('deleteBleet()', function () {
      it('makes a DELETE request for the specified bleet', function () {
        $httpBackend.expect('DELETE', '/api/bleets/0').respond(200);

        bleets.deleteBleet(0);

        $httpBackend.flush();
      });
    });
  });
})();
