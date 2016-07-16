var _ = require('lodash');

function UserRequestHandler(seedData){
  var users = seedData;
  var nextId = Object.keys(users).length+1;

  this.getAll = function(req, res){
    var sortedBleets = _
      .chain(users)
      .sortBy('name')
      .value();

    res.type('json');
    res.status(200).send(sortedBleets);
  };

  this.get = function(req, res){
    var user = users[req.params.user_id];

    if(!user){
      res.status(404).send({error:'User cannot be found.'});
      return;
    }

    res.type('json');
    res.status(200).send(user);
  };

  this.post = function(req, res){
    if(!req.body.username){
      res.status(400).send({error:'A username must be provided.'});
      return;
    }

    if(_.findKey(users, {'username': req.body.username})){
      res.status(400).send({error:'The username ' + req.body.username + ' is already in use.'});
      return;
    }

    users[nextId] = {
      id: nextId,
      username: req.body.username,
      fullName: req.body.fullName
    };
    nextId++;

    res.status(201).end();
  };

  this.patch = function(req, res){
    var user = users[req.params.user_id];

    if(!user){
      res.status(404).send({error:'User cannot be found.'});
      return;
    }

    user.fullName = req.body.fullName;
    res.status(200).end();
  };

  this.delete = function(req, res){
    var user = users[req.params.user_id];

    if(!user){
      res.status(404).send({error:'User cannot be found.'});
      return;
    }

    delete users[req.params.user_id];
    res.status(200).end();
  };
}

module.exports = UserRequestHandler;
