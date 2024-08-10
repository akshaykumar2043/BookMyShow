const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
});

module.exports = mongoose.model('Customer', customerSchema);
