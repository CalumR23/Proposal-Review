const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User.js');

passport.serializeUser((user, done)=> {
  done(null, user.id);
})

passport.deserializeUser((id, done)=> {
  User.findById(id).then((user)=> {
    done(null, id);
  })
})

passport.use(
  new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  }, (accessToken, refreshToken, profile, done)=> {
    //profile is the profile you requested from google
    //check if user exists
    User.findOne({googleID: profile.id}).then((user)=> {
      if (user) {
        done(null, user);
      }
      else {
        let newUser = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          googleID: profile.id
        });
        newUser.save().then((newUser)=> {
          done(null, newUser);
        });
      }
    })

  })
)
