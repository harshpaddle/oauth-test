const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
  // option for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: '281085302716-091j5k8qt0tb7aknhs5mj0ab73c7p6ha.apps.googleusercontent.com',
    clientSecret: 'Tq_EwD-XxW-W7eiBBNmGfOQr'
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport callback function fired');
    console.log(profile);
  })
)