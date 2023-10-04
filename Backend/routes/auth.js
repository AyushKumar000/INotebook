const express = require("express");
require('dotenv').config()
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const JWT_SIGN = process.env.JWT_SIGN ;

router.post(
  "/signup",
  [
    body("name", "name must be atleast of 5 character").isLength({ min: 5 }),
    body("email", "your email is not of email type").isEmail(),
    body("password", "password must be atleast of 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success ,errors: result.array() });
    }
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        return res.status(400).json({ success, error: "user with same email exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userDetails = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const userCreated = await userDetails.save();

      const data = {
        user: {
          id: userCreated.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SIGN);
      success = true;
      res.json({ success ,authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success , errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SIGN);
      success = true;
      res.json({ success , authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/getuser", AuthMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
