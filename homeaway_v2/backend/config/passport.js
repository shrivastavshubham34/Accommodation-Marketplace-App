var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var kafka = require("../kafka/client");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = "273LABSubmit";

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      kafka.make_request("jwtauth", jwt_payload, function(err, results) {
        console.log("in node jwt auth ");
        console.log(results);
        if (err) {
          console.log("Inside err");
          return done(err, false);
        } else {
          if (results) {
            done(err, results);
          } else done(null, false);
        }
      });
    })
  );
};
