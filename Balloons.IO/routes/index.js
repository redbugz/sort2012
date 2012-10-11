
/*
 * Module dependencies
 */

var parent = module.parent.exports
  , config = parent.config
  , app = parent.app
  , passport = require('passport')
  , client = parent.client
  , utils = require('../utils');

/*
 * Homepage
 */

app.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    client.hmset(
        'users:' + req.user.provider + ":" + req.user.username
      , req.user
    );
    res.redirect('/rooms');
  } else{
    res.render('index');
  }
});

/*
 * Authentication routes
 */

if(config.auth.twitter.consumerkey.length) {
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
}

if(config.auth.facebook.clientid.length) {
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );
}

app.get('/auth/guest',
    // Authenticate using HTTP Basic credentials, with session support disabled,
    // and allow anonymous requests.
    passport.authenticate(['local', /*'guest',*/ 'anonymous'], {
      successRedirect: '/rooms',
      failureRedirect: '/login'
    }),
    function(req, res){
      if (req.user) {
        res.json({ username: req.user.username, email: req.user.email });
      } else {
        res.json({ anonymous: true });
      }
});

app.post('/auth/local',
    // Authenticate using HTTP Basic credentials, with session support disabled,
    // and allow anonymous requests.
    passport.authenticate(['local', /*'guest',*/ 'anonymous'], {
      successRedirect: '/rooms',
      failureRedirect: '/login'
    }),
    function(req, res){
      if (req.user) {
        res.json({ username: req.user.username, email: req.user.email });
      } else {
        res.json({ anonymous: true });
      }
});

app.get('/auth/familysearch',
    passport.authenticate('familysearch'),
    function(req, res){
      // The request will be redirected to FamilySearch for authentication, so
      // this function will not be called.
    });

app.get('/auth/familysearch/callback',
    passport.authenticate('familysearch', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*
 * Rooms list
 */

app.get('/rooms', utils.restrict, function(req, res) {
  utils.getPublicRoomsInfo(client, function(rooms) {
    res.render('room_list', { rooms: rooms });
  });
});

/*
 * Create a rooom
 */

app.post('/create', utils.restrict, function(req, res) {
  utils.validRoomName(req, res, function(roomKey) {
    utils.roomExists(req, res, client, function() {
      utils.createRoom(req, res, client);
    });
  });
});

/*
 * Join a room
 */

app.get('/:id', utils.restrict, function(req, res) {
  utils.getRoomInfo(req, res, client, function(room) {
    utils.getUsersInRoom(req, res, client, room, function(users) {
      utils.getPublicRoomsInfo(client, function(rooms) {
        utils.getUserStatus(req.user, client, function(status) {
          utils.enterRoom(req, res, room, users, rooms, status);
        });
      });
    });
  });
});

