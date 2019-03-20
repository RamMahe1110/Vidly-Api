const express = require("express");
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");
const _ = require("lodash");
const router = express.Router();
const { User, validate } = require("../models/users");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.json("Something went worng");
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users)
    return res.status(400).json("There was a problem getting users :(");
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json("The User with the given ID was not found :(");
  res.json(user);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email });
  if (user) return res.status(400).json("User already exist!");
  user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .json(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, password },
    { new: true }
  );
  if (!user)
    return res.status(404).json("The User with the given ID was not found :(");
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).json("The User with the given ID was not found :(");
  res.json("Deleted", user);
});

module.exports = router;
