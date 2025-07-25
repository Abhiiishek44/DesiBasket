const express = require("express");
const { addToCart, getCartItems ,removeCartItem,updateCartItemQuantity} = require("../controller/cartController");
const router = express.Router();

// Route to add a product to the cart
router.post("/add", addToCart);
router.get("/:userId", getCartItems);
router.delete("/remove", removeCartItem);
router.put("/update-quantity", updateCartItemQuantity);

// Export the router
module.exports = router;