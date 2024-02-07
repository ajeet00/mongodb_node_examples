const mongoose = require('mongoose');

const category = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});

const categorySchema = mongoose.model('Category', category);
module.exports = categorySchema;