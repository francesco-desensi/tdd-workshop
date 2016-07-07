var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
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

var nextId = 6;
var prefix = '/api';
var bleetUri = prefix + '/bleets';

app.get(bleetUri, function (req, res) {
  var sortedBleets = _
    .chain(bleets)
    .sortBy('postDate')
    .reverse()
    .value();

  res.type('json');
  res.status(200).send(sortedBleets);
});

app.post(bleetUri, function (req, res) {
  bleets[nextId] = {
    id: nextId,
    postDate: req.body.postDate || new Date().toJSON(),
    text: req.body.text,
    author: '/user/1'
  };
  nextId++;

  res.status(201).end();
});

app.patch(bleetUri, function (req, res) {
  var bleet = bleets[req.body.id];
  bleet.text = req.body.text;

  res.status(200).end();
});

app['delete'](bleetUri, function (req, res) {
  delete bleets[req.body.id];
  res.status(200).end();
});

module.exports = function(port) {
  port = port || 3000;
  app.listen(port, function() {
    console.log('Express server initialized on port ' + port + '!');
  });

  return prefix;
};
