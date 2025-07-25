const Cart = require("../models/cart/cartModel");

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to add product to cart", error: err.message });
  }
};

const getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart retrieved successfully", cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to retrieve cart", error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemExists = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: err.message,
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    if (!userId || !productId || quantity < 1) {
      return res
        .status(400)
        .json({
          message: "User ID, Product ID and valid quantity are required",
        });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    res
      .status(200)
      .json({ message: "Cart item quantity updated successfully", cart });
  } catch (err) {
    console.error("Error updating cart item quantity:", err);
    res
      .status(500)
      .json({
        message: "Failed to update cart item quantity",
        error: err.message,
      });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity
};
