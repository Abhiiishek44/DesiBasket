const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productSchema',
            required: true
        }
    }]
})

module.exports = mongoose.model('Wishlist', wishListSchema);

