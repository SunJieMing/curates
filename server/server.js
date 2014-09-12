var mongo = require('../mongo');
var userController = require('./users/userController.js');
// var url = require('url');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

// //serve static files in client when referred to in html
// app.use(express.static(__dirname + '/client'));

 var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();
var port = 3000;

mongoose.connect('mongodb://localhost/curates'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// add new collection endpoint
// responds with null if collection can't be added

app.post('/api/collection/create', function(req, res) {
  mongo.create(req.body).then(function(collection) {
    res.statusCode = 201;
    res.end(JSON.stringify(collection));
  });
});

// update collection endpoint
// responds with the updated collection
app.post('/api/collection/update', function(req, res) {
  mongo.update(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// add a link to collection
app.post('/api/collection/addlink', function(req, res) {
  mongo.addLink(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// add a star to a collection
// this will check if the given user has already stared the collection
// and if not, add the user to userStars and increment stars.
// responds with the collection, updated or not
app.post('/api/collection/addStar', function(req, res) {
  mongo.addStar(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve a collection by url
app.get('/api/collection/:url', function(req, res) {
  mongo.findByUrl(req.params.url).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve the meta data for all of a users collections
app.get('/api/user/:userProvider/:userId', function(req, res) {
  var user = {
    provider: req.params.userProvider,
    id: req.params.userId
  };
  mongo.getUserCollections(user).then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// retrieve the meta data for all collections
app.get('/api/all', function(req, res) {
  mongo.getAllCollections().then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// route all other requests to the main page
app.use(function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// start the server
app.listen(port, function() {
  console.log('listening on', port);
});

// export our app for testing and flexibility, required by index.js
module.exports = app;