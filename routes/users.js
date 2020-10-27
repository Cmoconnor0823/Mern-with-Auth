const router = require("express").Router();
const bcrypt = require("");
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth");
const User = require("../models/usermodel");

// Beginning of register route

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // Beginning of validation
    if (!email || !password || passwordCheck)
      return res.status(400).json({
        msg: "One or more fields were submitted without data.",
      });

    if (password.length < 8)
      return res.status(400).json({
        msg: "The password needs to be at least 8 characters.",
      });

    if (password !== passwordCheck)
      return res.status(400).json({
        msg: "Please enter your password again for verification.",
      });

    const exisitingUser = await User.findOne({ email: email });

    if (exisitingUser)
      return res.status(400).json({
        msg: "An account with this email already exists.",
      });

    if (!displayName) displayName = email;

    //begin hashing of password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = newUser({
      email,
      password: passwordHash,
      displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete( "/delete", auth, async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err){
        res.status(500).json({ error: err.message });
    }

})
