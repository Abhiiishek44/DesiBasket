const express = require("express");
const { addToCart, getCartItems ,removeCartItem,updateCartItemQuantity} = require("../controller/cartController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Route to add a product to the cart
router.post("/add", verifyToken, addToCart);
router.get("/getCart-Item", verifyToken, getCartItems);
router.delete("/remove", verifyToken, removeCartItem);
router.put("/update-quantity", verifyToken, updateCartItemQuantity);

// Export the router
module.exports = router;