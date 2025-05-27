const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const scrapeIMDB = require("./scraper"); // Updated
const Movie = require("./models/Movie"); // Updated

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// POST /scrape
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  try {
    const movie = await scrapeIMDB(url);
    const newMovie = new Movie(movie);
    await newMovie.save();
    res.json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /movies
app.get("/movies", async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
