import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
// 1. Export the actual context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cart/getCart-Item`,
          {
            withCredentials: true,
          }
        );
        console.log("Cart items fetched successfully:", response.data);
        if (response.status === 200) {
          const cartItems = response.data.cart?.items || [];
          setCartItem(
            cartItems.map((item) => ({
              ...item.product,
              quantity: item.quantity,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch cart items", err);
        setCartItem([]);
        if (err.response?.status !== 404 && err.response?.status !== 401) {
          toast.error("Failed to fetch cart items");
        }
      }
    };
    fetchCartItems();
  }, []);

  const addToCart = async (product) => {
    setCartItem((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    const productId = product._id;

    const Response = await axios.post(
      "http://localhost:3000/cart/add",
      {
        productId: productId,
      },
      { withCredentials: true }
    );

    if (Response.status === 200) {
      toast.success(` ${product.name} added to cart`);
    }
  };

  const removeFromCart = async (productId) => {

    const removedItem = cartItem.find((item) => item._id === productId);

    setCartItem((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
    try {
      const response = await axios.delete("http://localhost:3000/cart/remove", {
        data: { productId },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(`Product removed from cart`);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove product from cart");

      if (removedItem) {
        setCartItem((prevItems) => [...prevItems, removedItem]);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:3000/cart/update-quantity",
        {
          productId: productId,
          quantity: quantity,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCartItem((prevItems) => {
          return prevItems.map((item) =>
            item._id === productId ? { ...item, quantity: quantity } : item
          );
        });
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error("Failed to update cart item quantity");
    }
  };

  const getTotalItems = () => {
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalPrice = () => {
    return cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
