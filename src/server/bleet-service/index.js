var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var BleetRequestHandler = require('./bleet-request-handler.js');
var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var bleets = {
  1: {
    id: 1,
    postDate: new Date(1466791000000).toJSON(),
    text: 'Have you guys seen the John Papa Style Guide?! #socool',
    author: '/user/2'
  },
  2: {
    id: 2,
    postDate: new Date(1466792000000).toJSON(),
    text: 'Way better than that pizza I had last night #theworst',
    author: '/user/3'
  },
  3: {
    id: 3,
    postDate: new Date(1466793000000).toJSON(),
    text: 'Worse than high school cafeteria pizza? #inquiringminds #enquiringminds',
    author: '/user/4'
  },
  4: {
    id: 4,
    postDate: new Date(1466794000000).toJSON(),
    text: 'Yes #makesmemisspizzaboats',
    author: '/user/3'
  },
  5: {
    id: 5,
    postDate: new Date(1466795000000).toJSON(),
    text: 'Ahem, yes, that style guide is good stuff #checkitout',
    author: '/user/1'
  }
};

var prefix = '/api';
var bleetUri = prefix + '/bleets';
var requestHandler = new BleetRequestHandler(bleets);

app.get(bleetUri, requestHandler.get);

app.post(bleetUri, requestHandler.post);

app.patch(bleetUri, requestHandler.patch);

app.delete(bleetUri, requestHandler.delete);

module.exports = function(port) {
  port = port || 3000;
  app.listen(port, function() {
    console.log('Express server initialized on port ' + port + '!');
  });

  return prefix;
};
