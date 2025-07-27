const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product:{
         type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema', // assuming ProductModel is registered as 'Product'
    required: true,
    },
    quantity:{
        type:Number,
        require:true,
        min:1,
        default:0
    }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true
  },
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);