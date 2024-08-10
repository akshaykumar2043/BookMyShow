const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  
        showTiming: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'ShowTiming',  
            },
        customerName: { 
            type: String, 
        },
        customerContact:{
            type: String, 
        },
        customerEmail: { 
            type: String, 
        },
        seatsBooked: { 
            type: Number,  
        },
        bookingDate: { 
            type: Date, 
            default: Date.now
        },
     
});

module.exports = mongoose.model('Booking', bookingSchema);
