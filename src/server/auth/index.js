const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    clientID: "944917879921-qe018n53qhrkk7olumnhia94abg1s71q.apps.googleusercontent.com",
    clientSecret: "N4oU5XWlKVw0BTd3kvzJJnjv",
    callbackURL: '/auth/google/cb'
  }, (accessToken, refreshToken, profile, done)=> {
    //profile is the profile you request from google
    console.log('passport callback function fired');
    console.log(profile);
  })
)
