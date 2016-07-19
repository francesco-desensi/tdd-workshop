var chai = require('chai');
var sinon = require('sinon');
chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

var BleetRequestHandler = require('../bleet-request-handler.js');

describe('Bleet service request handler', function(){
  var req, res, requestHandler, bleets, statusSpy;

  beforeEach(function(){
    bleets = {
      1: {
        id: 1,
        postDate: new Date(1466791000000).toJSON(),
        text: 'Have you guys seen the John Papa Style Guide?! #socool',
        author: '/user/2'
      }
    };

    req = res = {};
    res.type = sinon.stub();
    requestHandler = new BleetRequestHandler('/api', bleets);

    statusSpy = res.status = sinon.spy(function(){
      return {
        send: sinon.stub(),
        end: sinon.stub()
      }
    });
  });

  describe('When a get is called', function(){

    it('should respond with a 200 code', function(){
      requestHandler.getAll(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should send a response containing the correct number of bleets', function(){
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

  describe('When a post is called', function(){
    beforeEach(function(){
      req.body = {
        postDate: new Date().toJSON(),
        text: "This is a test",
        author: '/api/users/1'
      };
    });

    it('should respond with a 201 code', function(){
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(201)).to.be.true;
    });

    it('should respond with a 400 code when an author is not specified', function(){
      delete req.body['author'];
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('should respond with a 400 code when an author value does not match the specified pattern', function(){
      req.body.author = 'this is not right';
      requestHandler.post(req, res);

      expect(statusSpy.calledWith(400)).to.be.true;
    });

    it('should add the new bleet to the array', function(){
      requestHandler.post(req, res);

      expect(Object.keys(bleets).length).to.be.equal(2);
    });
  });

  describe('When a patch is called', function(){
    beforeEach(function(){
      req.body = {
        id: 1,
        text: "This is the new text"
      };

      req.params = {
        bleet_id: 1
      };
    });

    it('should respond with a 200 code', function(){
      requestHandler.patch(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should respond with a 404 code when the request bleet cannot be found', function(){
      req.params.bleet_id = 49;
      requestHandler.patch(req, res);

      expect(statusSpy.calledWith(404)).to.be.true;
    });

    it('should change the value', function(){
      requestHandler.patch(req, res);

      expect(bleets['1'].text).to.be.equal("This is the new text")
    });
  });

  describe('When a delete is called', function(){
    beforeEach(function(){
      req.body = {
        id: 1
      };

      req.params = {
        bleet_id: 1
      };
    });

    it('should respond with a 200 code', function(){
      requestHandler.delete(req, res);

      expect(statusSpy.calledWith(200)).to.be.true;
    });

    it('should respond with a 404 code when the request bleet cannot be found', function(){
      req.params.bleet_id = 49;
      requestHandler.delete(req, res);

      expect(statusSpy.calledWith(404)).to.be.true;
    });

    it('should delete the record', function(){
      requestHandler.delete(req, res);

      expect(Object.keys(bleets).length).to.be.equal(0);
    });
  });
});