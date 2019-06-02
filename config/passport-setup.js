const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  // done is a passport method to pass the user on to the next level if there is a user 
  // null is sub for err
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
})

passport.use(
  new GoogleStrategy({
    // option for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    // console.log('passport callback function fired');
    // console.log(profile);

    // check if user already exists in our db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // found the user
        console.log("user is" + currentUser);
        done(null, currentUser)
      } else {
        // didn't find the user
        new User({
          email: profile._json.email,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log("new user created" + newUser);
          done(null, newUser);
        });
      }
    })


  })
)

