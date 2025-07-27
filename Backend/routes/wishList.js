const express = require('express');
const router = express.Router();
const { addToWishList, getWishListItems, removeFromWishList,clearWishList} = require('../controller/wishListController');
const verifyToken = require('../middleware/authMiddleware');
// Route to add a product to the wish list
router.post('/add-to-wishlist', verifyToken, addToWishList);
router.get('/get-items', verifyToken, getWishListItems);
router.delete('/remove-from-wishlist', verifyToken, removeFromWishList);
router.delete('/clear-wishlist', verifyToken, clearWishList);
module.exports = router;

