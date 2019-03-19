const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID was not found.");
  res.json(customer);
});

router.post("/", async (req, res) => {
  const { isGold, name, phone } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({ isGold, name, phone });
  customer = await customer.save();
  res.json(customer);
});

router.put("/:id", async (req, res) => {
  const { isGold, name, phone } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { isGold, name, phone },
    { new: false }
  );
  res.json(customer);
});

router.delete("/:id", async (req, res) => {
  let customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID was not found.");
  res.json(customer);
});

module.exports = router;
