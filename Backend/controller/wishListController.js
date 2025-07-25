const Wishlist = require('../models/Wishlist/wishListModel');

const addToWishList = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    try {
        let userWishlist = await Wishlist.findOne({ user: userId });

        if (!userWishlist) {
            userWishlist = new Wishlist({ user: userId, items: [] });
        }

        const existingItem = userWishlist.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            return res.status(409).json({ message: "Product already in wishlist" });
        }

        userWishlist.items.push({ product: productId });
        await userWishlist.save();

        res.status(200).json({
            message: "Product added to wishlist",
            wishlist: userWishlist,
        });

    } catch (err) {
        console.error("Failed to add to wishlist:", err);
        res.status(500).json({
            message: "Failed to add product to wishlist",
            error: err.message,
        });
    }
};

const getWishListItems = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {

        const wishlist = await Wishlist.findOne({ user: userId }).populate({
            path: 'items.product',
            model: 'productSchema' 
        });

        if (!wishlist) {
            return res.status(200).json({
                message: "Wishlist is empty",
                wishlist: { items: [] }, 
            });
        }

        res.status(200).json({
            message: "Wishlist items retrieved successfully",
            wishlist: {
                items: wishlist.items || [] 
            },
        });

    } catch (err) {
        console.error("Failed to retrieve wishlist items:", err);
        res.status(500).json({
            message: "Failed to retrieve wishlist items",
            error: err.message,
        });
    }
};

const removeFromWishList = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const originalLength = wishlist.items.length;

        // Filter out the product to be removed
        wishlist.items = wishlist.items.filter(
            item => item.product.toString() !== productId
        );

        if (wishlist.items.length === originalLength) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        await wishlist.save();

        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist: wishlist,
        });

    } catch (err) {
        console.error("Failed to remove from wishlist:", err);
        res.status(500).json({
            message: "Failed to remove product from wishlist",
            error: err.message,
        });
    }
};

const clearWishList = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try{
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        wishlist.items = [];
        await wishlist.save();
        res.status(200).json({ message: "Wishlist cleared successfully" });
    } catch (err) {
        console.error("Failed to clear wishlist:", err);
        res.status(500).json({
            message: "Failed to clear wishlist",
            error: err.message,
        });
    }
}

module.exports = {
    addToWishList,
    getWishListItems,
    removeFromWishList,
    clearWishList
};

