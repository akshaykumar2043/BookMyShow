const mongoose = require('mongoose');


const screenSchema = new mongoose.Schema({
    screenNumber: { 
        type: Number,
         },
    seatingCapacity: { 
        type: Number, 
        default: 50
     }
  });
  module.exports = mongoose.model('Screen', screenSchema);