var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var { User } = require("../models/user");
// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = "273LABSubmit";

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      var doc = User.findById(jwt_payload.id);
      console.log(doc);
      done(err, doc);
    })
  );
};
