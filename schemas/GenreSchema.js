const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        trim: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;