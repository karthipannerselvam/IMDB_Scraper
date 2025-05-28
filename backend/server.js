const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const scrapeIMDB = require("./scraper");
const Movie = require("./models/Movie");

dotenv.config();
const app = express();

// Explicit CORS allowing your frontend domain only:
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // set FRONTEND_URL in your Render env vars
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST /scrape
app.post("/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith("https://www.imdb.com/title/")) {
    return res.status(400).json({ error: "Invalid IMDb URL." });
  }
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
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
