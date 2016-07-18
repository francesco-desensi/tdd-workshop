var _ = require('lodash');

function BleetRequestHandler(userUriPrefix, seedData){
  var bleets = seedData;
  var nextId = Object.keys(bleets).length+1;
  var authorUriPattern = new RegExp('^' + userUriPrefix + '/users/\\d+$');

  this.getAll = function(req, res){
    var sortedBleets = _
      .chain(bleets)
      .sortBy('postDate')
      .reverse()
      .value();

    res.type('json');
    res.status(200).send(sortedBleets);
  };

  this.post = function(req, res){

    if(!req.body.author){
      res.status(400).send({error:'Author uri must be provided.'});
      return;
    }

    if(!authorUriPattern.test(req.body.author)){
      res.status(400).send({error:'Author uri must be in the format /{api prefix}/users/{id}.'});
      return;
    }

    bleets[nextId] = {
      id: nextId,
      postDate: req.body.postDate || new Date().toJSON(),
      text: req.body.text,
      author: req.body.author
    };
    nextId++;

    res.status(201).end();
  };

  this.patch = function(req, res){
    var bleet = bleets[req.params.bleet_id];

    if(!bleet){
      res.status(404).send({error:'Bleet cannot be found.'});
      return;
    }

    bleet.text = req.body.text;
    res.status(200).end();
  };

  this.delete = function(req, res){
    var bleet = bleets[req.params.bleet_id];

    if(!bleet){
      res.status(404).send({error:'Bleet cannot be found.'});
      return;
    }

    delete bleets[req.params.bleet_id];
    res.status(200).end();
  };
}

module.exports = BleetRequestHandler;
