const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  rating: String,
  genres: [String],
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
