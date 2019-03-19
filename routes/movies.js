const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).json("The Movie with the given ID was not found :(");
  res.json(movie);
});

router.post("/", async (req, res) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock,
    dailyRentalRate
  });

  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock,
      dailyRentalRate
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).json("The Movie with the given ID was not found :(");
  res.json(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).json("The Movie with the given ID was not found :(");
  res.json(movie);
});

module.exports = router;

//const genreSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   }
// });
// const Genre = mongoose.model("miniGenre", genreSchema);
