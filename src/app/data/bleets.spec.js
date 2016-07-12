(function () {
  'use strict';

  describe('bleets', function () {
    var bleets;
    var $http, $httpBackend;

    beforeEach(module('tddWorkshop.data'));

    beforeEach(inject(function ($injector) {
      bleets = $injector.get('bleets');
      $http = $injector.get('$http');
      $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAllBleets()', function () {
      var bleetsFromServer;
      beforeEach(function(){
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

      it('rejects with the response object from $http when call fails', function() {
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
        $httpBackend.expectPOST('/api/bleets', {text: 'bleetText'}).respond(201);

        bleets.createBleet('bleetText');

        $httpBackend.flush();
      });

      it('returns no data', function () {
        $httpBackend.expectPOST('/api/bleets', {text: 'bleetText'}).respond(201);

        var promise = bleets.createBleet('bleetText');
        var resolvedValue = null;
        promise.then(function (data) {
          resolvedValue = data;
        });

        $httpBackend.flush();
        expect(resolvedValue).toBeUndefined();
      });

      it('rejects with the response object from $http when call fails', function() {
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
  });
})();
