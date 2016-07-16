var _ = require('lodash');

function BleetRequestHandler(seedData){
  var bleets = seedData;
  var nextId = Object.keys(bleets).length+1;

  this.get = function(req, res){
    var sortedBleets = _
      .chain(bleets)
      .sortBy('postDate')
      .reverse()
      .value();

    res.type('json');
    res.status(200).send(sortedBleets);
  };

  this.post = function(req, res){
    bleets[nextId] = {
      id: nextId,
      postDate: req.body.postDate || new Date().toJSON(),
      text: req.body.text,
      author: '/user/1'
    };
    nextId++;

    res.status(201).end();
  };

  this.patch = function(req, res){
    var bleet = bleets[req.body.id];

    if(!bleet){
      res.status(404).end();
      return;
    }

    bleet.text = req.body.text;
    res.status(200).end();
  };

  this.delete = function(req, res){
    var bleet = bleets[req.body.id];

    if(!bleet){
      res.status(404).end();
      return;
    }

    delete bleets[req.body.id];
    res.status(200).end();
  };
}

module.exports = BleetRequestHandler;
