const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user'); // Assuming you have a User model


// REGISTER (updated for Mongoose v8)
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save(); // Mongoose v8 requires promises

    const token = user.generateJwt();
    res.status(200).json({ token });

  } catch (err) {
  console.log("REGISTER ERROR:", err);
  res.status(400).json(err);
}

};

/* OLD VERSION, NOT SUPPORTED BY MONGO 8.2 VERSION
user.save((err) => {
    if (err) {
        res.status(400).json(err);
    } else {
    const token = user.generateJwt();
        res.status(200).json({token});
    }
  })
};
*/


const login = function(req, res) {
  console.log("LOGIN ROUTE HIT");

  console.log("Strategies:", passport._strategies);
  
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (!user) {
      return res.status(401).json(info);
    }

    const token = user.generateJwt();
    return res.status(200).json({ token: token });
  })(req, res);
};



module.exports = {
    register,
    login
};
