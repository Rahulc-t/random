const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
// const multer=require("multer")
// const fs=require("fs")
// const sharp=require("sharp")
// const path=require("path")

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      country: "",
      username:req.body.username,
      userType:"user"
    });
    const result = await user.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, 'mysecret', { expiresIn: "1d" });
    const userType = user.userType;

    res.cookie("Authtoken", token, { httpOnly: true, secure: false }); // Adjust 'secure' based on your environment
    res.json({
      status: true,
      message: "login success",
      token,
      userType,
      email: user.email, // This should be `user.email`
      userType: user.userType // This should be `user.userType`
    });

  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;