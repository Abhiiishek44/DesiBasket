const express = require('express');
const router = express.Router();
const { addToWishList, getWishListItems, removeFromWishList,clearWishList} = require('../controller/wishListController');

// Route to add a product to the wish list
router.post('/add-to-wishlist', addToWishList);
router.get('/:userId', getWishListItems);
router.delete('/remove-from-wishlist', removeFromWishList);
router.delete('/clear-wishlist/:userId', clearWishList);
module.exports = router;