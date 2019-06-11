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
    let email = profile.emails[0].value;
    console.log(email);

    User.findOne({googleID: profile.id}).then((user)=> {
      if (user) {
        done(null, user);
      }
      else {

        User.findOne({email}).then((user)=> {
          if (!user) {
            let newUser = new User({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              googleID: profile.id
            });
            newUser.save().then((newUser)=> {
              done(null, newUser);
            });
          } else {
            User.findOneAndUpdate({email}, {googleID: profile.id}).then((user)=> {
              done(null, user);
            });
          }
        })
      }
    })

  })
)
