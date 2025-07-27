const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "Credit Card", "UPI", "Net Banking"],
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  shippingAddress: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    phone: String,
  },
   orderDate:{
    type: Date,
    default: Date.now,  
   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);