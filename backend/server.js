const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const scrapeIMDB = require("./scrape");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*" // You can restrict this to just your frontend URL
}));
app.use(express.json());

// MongoDB model
const movieSchema = new mongoose.Schema({
  title: String,
  rating: String,
  genres: [String],
  summary: String,
});
const Movie = mongoose.model("Movie", movieSchema);

// Scrape endpoint
app.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;
    const data = await scrapeIMDB(url);
    const saved = await Movie.create(data);
    res.status(200).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed." });
  }
});

// Get all movies
app.get("/movies", async (req, res) => {
  const movies = await Movie.find().sort({ _id: -1 });
  res.json(movies);
});

// DB connection and start server
mongoose
  .connect(process.env.MONGO_URI, { dbName: "imdb" })
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => console.error("DB error", err));
