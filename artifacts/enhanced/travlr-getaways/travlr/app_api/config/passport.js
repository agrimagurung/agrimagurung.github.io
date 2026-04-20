const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      console.log("LocalStrategy invoked with:", username, password);

      const user = await User.findOne({ email: username });

      console.log("User lookup result:", user);

      if (!user) {
        console.log("No user found");
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validPassword(password)) {
        console.log("Invalid password");
        return done(null, false, { message: 'Incorrect password.' });
      }

      console.log("User authenticated successfully");
      return done(null, user);

    } catch (err) {
      console.log("Lookup error:", err);
      return done(err);
    }
  }
));