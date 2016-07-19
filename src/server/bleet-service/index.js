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
    author: '/api/users/2'
  },
  2: {
    id: 2,
    postDate: new Date(1466792000000).toJSON(),
    text: 'Way better than that pizza I had last night #theworst',
    author: '/api/users/3'
  },
  3: {
    id: 3,
    postDate: new Date(1466793000000).toJSON(),
    text: 'Worse than high school cafeteria pizza? #inquiringminds #enquiringminds',
    author: '/api/users/1'
  },
  4: {
    id: 4,
    postDate: new Date(1466794000000).toJSON(),
    text: 'Yes #makesmemisspizzaboats',
    author: '/api/users/3'
  },
  5: {
    id: 5,
    postDate: new Date(1466795000000).toJSON(),
    text: 'Ahem, yes, that style guide is good stuff #checkitout',
    author: '/api/users/1'
  },
  6: {
    id: 6,
    postDate: new Date(1466795000000).toJSON(),
    text: 'Ahem, yes, that style guide is good stuff #checkitout',
    author: '/api/users/1'
  }
};

var prefix = '/api';
var bleetUri = prefix + '/bleets';
var instanceUrl = bleetUri + '/:bleetId';
var requestHandler = new BleetRequestHandler(prefix, bleets);

app.get(bleetUri, requestHandler.getAll);

app.post(bleetUri, requestHandler.post);

app.patch(instanceUrl, requestHandler.patch);

app.delete(instanceUrl, requestHandler.delete);

module.exports = function(port) {
  port = port || 3003;
  app.listen(port, function() {
    console.log('Express server initialized on port ' + port + '!');
  });

  return prefix;
};
