
/*
 * Module dependencies
 */

var parent = module.parent.exports
  , config = parent.config
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , AnonymousStrategy = require('passport-anonymous').Strategy
  , LocalStrategy = require('passport-local').Strategy
  , GuestStrategy = require('./passport-guest.js').Strategy
  , FamilySearchStrategy = require('passport-familysearch').Strategy;


/*
 * Auth strategy
 */

passport.serializeUser(function(user, done) {
  console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("deserializeUser", user);
  done(null, user);
});

if(config.auth.twitter && config.auth.twitter.consumerkey.length) {
  passport.use(new TwitterStrategy({
      consumerKey: config.auth.twitter.consumerkey,
      consumerSecret: config.auth.twitter.consumersecret,
      callbackURL: config.auth.twitter.callback
    },
    function(token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  ));
} 

if(config.auth.facebook && config.auth.facebook.clientid.length) {
  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.clientid,
      clientSecret: config.auth.facebook.clientsecret,
      callbackURL: config.auth.facebook.callback
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
}


passport.use(new FamilySearchStrategy({
      requestTokenURL: config.auth.familysearch.reference+'identity/v2/request_token',
      accessTokenURL: config.auth.familysearch.reference+'identity/v2/access_token',
      userAuthorizationURL: config.auth.familysearch.reference+'identity/v2/authorize',
      userProfileURL: config.auth.familysearch.reference+'identity/v2/user',
      consumerKey: config.auth.familysearch.clientid || "WCQY-7J1Q-GKVV-7DNM-SQ5M-9Q5H-JX3H-CMJK",
      consumerSecret: '',
      callbackURL: config.auth.familysearch.callback
    },
    function(token, tokenSecret, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's FamilySearch profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the FamilySearch account with a user record in your database,
        // and return that user instead.
        console.log("familysearch profile", profile);
        return done(null, profile);
      });
    }
));

var users = [
  { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log("local verify", username);
      done(null, {provider: "guest", id: username.replace(" ", "_"), username: username, displayName: username});
    }
));

// Use the GuestStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.
//passport.use(new GuestStrategy({
//    },
//    function(username, password, done) {
//      console.log("guest auth start")
//      // asynchronous verification, for effect...
//      process.nextTick(function () {
//
//        // Find the user by username.  If there is no user with the given
//        // username, or the password is not correct, set the user to `false` to
//        // indicate failure.  Otherwise, return the authenticated `user`.
//        findByUsername(username, function(err, user) {
//          if (err) { return done(err); }
//          if (!user) { return done(null, false); }
////          if (user.password != password) { return done(null, false); }
//          console.log("guest return user")
//          return done(null, user);
//        })
//      });
//    }
//));

passport.use(new AnonymousStrategy());
