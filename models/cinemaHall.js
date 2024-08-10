const mongoose = require('mongoose');

const cinemaHallSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    screen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen'
    }
});

module.exports = mongoose.model('CinemaHall', cinemaHallSchema);
