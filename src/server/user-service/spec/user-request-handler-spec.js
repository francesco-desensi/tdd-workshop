var chai = require('chai');
var sinon = require('sinon');
chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

var UserRequestHandler = require('../user-request-handler.js');

describe('User service request handler', function(){
  var req, res, requestHandler, users, statusSpy;

  beforeEach(function(){
    users = {
      1: {
        id: 1,
        username: 'test',
        fullName: "Tester McTester"
      }
    };

    req = res = {};
    res.type = sinon.stub();
    requestHandler = new UserRequestHandler(users);

    statusSpy = res.status = sinon.spy(function(){
      return {
        send: sinon.stub(),
        end: sinon.stub()
      }
    });
  });

  describe('When getAll is called', function(){

    it('should respond with a 200 code', function(){
      requestHandler.getAll(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should send a response containing the correct number of users', function(){
      var sendSpy = res.send = sinon.spy();
      res.type = sinon.stub();
      res.status = sinon.stub().returns({
        send: sendSpy
      });

      requestHandler.getAll(req, res);

      sinon.assert.calledWith(sendSpy, sinon.match(function(value){
        return Object.keys(value).length == 1;
      }));
    });
  });

  describe('When get is called', function(){

    beforeEach(function(){
      req.params = {
        user_id: 1
      }
    });

    it('should respond with a 200 code for a valid user id', function(){
      requestHandler.get(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should send a response with the correct user', function(){
      var sendSpy = res.send = sinon.spy();
      res.type = sinon.stub();
      res.status = sinon.stub().returns({
        send: sendSpy
      });

      requestHandler.get(req, res);

      expect(sendSpy.calledWith(users['1'])).to.be.true;
    });
  });

  describe('When post is called', function(){
    beforeEach(function(){
      req.body = {
        username: 'pants',
        fullName: 'Mr. Pants'
      };
    });

    it('should respond with a 201 code', function(){
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(201)).to.be.true;
    });

    it('should reject the request with 400 if a username is not provided.', function(){
      delete req.body['username'];
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('should reject the request with 400 if a username already exists.', function(){
      req.body.username = 'test';
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('should add the new user to the array with the correct values', function(){
      requestHandler.post(req, res);

      expect(Object.keys(users).length).to.be.equal(2);
      expect(users['2'].username).to.be.equal('pants');
      expect(users['2'].fullName).to.be.equal('Mr. Pants');
    });
  });

  describe('When a patch is called', function(){
    beforeEach(function(){
      req.body = {
        id: 1,
        fullName: "New name"
      };

      req.params = {
        user_id: 1
      };
    });

    it('should respond with a 200 code', function(){
      requestHandler.patch(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should respond with a 404 code when the requested user cannot be found', function(){
      req.params.user_id = 49;
      requestHandler.patch(req, res);

      expect(statusSpy.calledWith(404)).to.be.true;
    });

    it('should change the user\'s full name', function(){
      requestHandler.patch(req, res);

      expect(users['1'].fullName).to.be.equal("New name")
    });
  });

  describe('When a delete is called', function(){
    beforeEach(function(){
      req.body = {
        id: 1
      };

      req.params = {
        user_id: 1
      };
    });

    it('should respond with a 200 code', function(){
      requestHandler.delete(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should respond with a 404 code when the requested user cannot be found', function(){
      req.params.user_id = 49;
      requestHandler.delete(req, res);

      expect(statusSpy.calledWith(404)).to.be.true;
    });

    it('should delete the record', function(){
      requestHandler.delete(req, res);

      expect(Object.keys(users).length).to.be.equal(0);
    });
  });
});