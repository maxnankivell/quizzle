const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../models/userModel');

function initializePassport(passport) {
  const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET };

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          if (user.changedPasswordAfter(jwt_payload.iat)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    }),
  );
}

module.exports = initializePassport;
