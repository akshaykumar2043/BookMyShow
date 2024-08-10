const mongoose = require('mongoose');

const showTimingSchema = new mongoose.Schema({
        movie: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Movie',
             },
        cinemaHall: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CinemaHall',
            },
        dateTime: {
             type: Date, 
            },
        availableSeats: {
             type: Number,
            },
      });

module.exports = mongoose.model('ShowTiming', showTimingSchema);
