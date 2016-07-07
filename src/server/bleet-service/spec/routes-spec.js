var chai = require('chai');
var sinon = require('sinon');
chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

var routes = require('../routes.js');

describe('When a get request is made for /api/bleets', function(){
  before(function(){
  });

  it('should send a response', function(){
    var req, res, sendSpy;
    req = res = {};
    sendSpy = res.send = sinon.spy();
    res.type = sinon.stub();
    res.status = sinon.stub().returns({
      send: sendSpy
    });

    routes.get(req, res);
    expect(sendSpy.calledOnce).to.equal(true);
  });
});