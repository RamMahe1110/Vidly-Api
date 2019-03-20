const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());

//Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening to Port ${process.env.PORT || 5000}`);
});

/*
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
// Different Code

/*const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

let genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

app.get("/api/genres", (req, res) => {
  console.log(req.body);
  res.json(genres);
});

app.post("/api/genres", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.json("Genre required and it should be greater than 2");
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.json(genre);
});

app.put("/api/genres/:id", (req, res) => {
  if (!req.params.id) return res.status(400).json("ID required");
  const genre = genres.filter(g => g.id === parseInt(req.params.id));
  if (!genre.length) return res.status(404).json("Not FOund");
  console.log(genre);
  genre[0].name = req.body.name;
  return res.json(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).json("ID required");
  }
  const newGenres = genres.filter(g => g.id !== parseInt(req.params.id));
  if (newGenres.length === genres.length) {
    return res.status(400).json("Not exist");
  }
  genres = newGenres;
  res.json(genres);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening to Port ${process.env.PORT || 5000}`);
}); */
