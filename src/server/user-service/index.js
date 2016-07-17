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
    fullName: 'Big Mike'
  },
  2: {
    id: 2,
    username: 'francesco',
    fullName: 'Francesco DeSensi'
  },
  3: {
    id: 3,
    username: 'chris',
    fullName: 'Christopher Venturini'
  }
};

var prefix = '/api';
var usersUri = prefix + '/users';
var requestHandler = new UserRequestHandler(users);

app.get(usersUri, requestHandler.getAll);

app.get(usersUri + '/:user_id', requestHandler.get);

app.post(usersUri, requestHandler.post);

app.patch(usersUri + '/:user_id', requestHandler.patch);

app.delete(usersUri + '/:user_id', requestHandler.delete);

module.exports = function(port) {
  port = port || 3001;
  app.listen(port, function() {
    console.log('Express server initialized on port ' + port + '!');
  });

  return prefix;
};
