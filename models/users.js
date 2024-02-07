const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['home', 'work', 'other'] // Enum for address types
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
            trim: true
        },
        age: {
            type: Number,
            min: [18, 'Must be at least 18 years old'],
            max: [120, 'Age must not exceed 120 years']
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        addresses: [addressSchema],
        isSallerAccount : {
            type: String,
            required : true,
            enum : ['yes', 'no']
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
