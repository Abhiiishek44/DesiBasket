const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        ref: 'Category', // Assuming you have a Category model
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    ratings:{
        type: Number,
        default: 0
    },

})

module.exports = mongoose.model('productSchema', productSchema);