const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieImage: {
        type: String,
    },
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    duration: {
        type: Number,
        default: 0,
    },
    director: {
        type: String,
    },
    cast: {
        type: String,
    },
    description_english: {
        type: String,
    },
    description_hindi: {
        type: String
    },
    originalLanguage: {
        type: String,
    },
    releaseDate: {
        type: Date

    },

}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
