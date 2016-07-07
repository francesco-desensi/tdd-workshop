var _ = require('lodash');

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

exports.get = function (req, res) {
  var sortedBleets = _
    .chain(bleets)
    .sortBy('postDate')
    .reverse()
    .value();

  res.type('json');
  res.status(200).send(sortedBleets);
};
