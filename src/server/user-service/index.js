var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var UserRequestHandler = require('./user-request-handler.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = {
  1: {
    id: 1,
    username: 'bigmike',
    fullName: 'Big Mike',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/6840903?v=3&s=72'
  },
  2: {
    id: 2,
    username: 'francesco',
    fullName: 'Francesco DeSensi',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/4389254?v=3&s=72'
  },
  3: {
    id: 3,
    username: 'chris',
    fullName: 'Christopher Venturini',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/2739350?v=3&s=40'
  }
};

var prefix = '/api';
var usersUri = prefix + '/users';
var instanceUri = usersUri + '/:userId';
var requestHandler = new UserRequestHandler(users);

app.get(usersUri, requestHandler.getAll);

app.get(instanceUri, requestHandler.get);

app.post(usersUri, requestHandler.post);

app.patch(instanceUri, requestHandler.patch);

app.delete(instanceUri, requestHandler.delete);

module.exports = function(port) {
  port = port || 3004;
  app.listen(port, function() {
    console.log('Express server initialized on port ' + port + '!');
  });

  return prefix;
};
