const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validate } = require("../models/auth");
const { User } = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Invalid Email or Password");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Invalid Email or Password");
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.json(token);
});

module.exports = router;
