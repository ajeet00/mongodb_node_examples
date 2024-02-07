const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Categories',
        required: true,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true,
    },
    product_type: {
        type: String,
        required: true
    },
    product_gallery: {
        type: Array,
        required: true
    },
    original_price: {
        type: Number,
    },
    sale_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
}, 
{ timestamps: true }
);

const Product = mongoose.model('Products', productSchema);
module.exports = Product;