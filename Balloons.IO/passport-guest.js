/**
 * Module dependencies.
 */
var passport = require('passport')
  , util = require('util');


/**
 * `Strategy` constructor.
 *
 * The guest authentication strategy passes authentication without verifying
 * credentials.
 *
 * Applications typically use this as a fallback on endpoints that can respond
 * to both authenticated and unauthenticated requests.  If credentials are not
 * supplied, this stategy passes authentication while leaving `req.user` set to
 * `undefined`, allowing the route to handle unauthenticated requests as
 * desired.
 *
 * Examples:
 *
 *     passport.use(new GuestStrategy());
 *
 * @api public
 */
function Strategy() {
  passport.Strategy.call(this);
  this.name = 'guest';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Pass authentication without verifying credentials.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
  console.log("guest pass");
  this.pass();
}


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;
