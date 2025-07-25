import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";
export const WishListContext = createContext();
   

export function WishListProvider({ children }) {
  const [wishListItems, setWishListItems] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchWishListItems = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/wishlist/${userId}`
          );
          if (response.status === 200) {
            const items = response.data.wishlist?.items || [];
            const mappedItems = items.map((item) => ({
              ...item.product,
              _id: item.product._id || item._id, // Ensure we have an ID
            }));

            setWishListItems(mappedItems);
          }
        } catch (err) {
          console.error("Failed to fetch wishlist items", err);
          // ✅ Set empty array on error
          setWishListItems([]);
        }
      }
    };
    fetchWishListItems();
  }, []);

  const addToWishList = async (product) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    const safeWishListItems = Array.isArray(wishListItems) ? wishListItems : [];
    const existingItem = safeWishListItems.find(
      (item) => item._id === product._id
    );
    if (existingItem) {
      toast("Item already in wishlist");
      return;
    }
    setWishListItems((prevItems) => [
      ...(Array.isArray(prevItems) ? prevItems : []),
      product,
    ]);

    try {
      const response = await axios.post(
        "http://localhost:3000/wishlist/add-to-wishlist",
        {
          userId: userId,
          productId: product._id,
        }
      );
      if (response.status === 200) {
        toast.success(`${product.name} added to wishlist`);
      }
    } catch (err) {
      console.error("Failed to add product to wishlist", err);
      toast.error("Failed to add product to wishlist");

      // ✅ Rollback on error
      setWishListItems((prevItems) =>
        (Array.isArray(prevItems) ? prevItems : []).filter(
          (item) => item._id !== product._id
        )
      );
    }
  };

  const removeFromWishlist = async (productId) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login to manage wishlist");
      return;
    }
    const safeWishListItems = Array.isArray(wishListItems) ? wishListItems : [];

    const itemToRemove = safeWishListItems.find(
      (item) => item._id === productId
    );
    if (!itemToRemove) {
      toast.info("Item not found in wishlist");
      return;
    }
    setWishListItems((prevItems) =>
      (Array.isArray(prevItems) ? prevItems : []).filter(
        (item) => item._id !== productId
      )
    );

    try {
      const response = await axios.delete(
        "http://localhost:3000/wishlist/remove-from-wishlist",
        {
          data: {
            userId: userId,
            productId: productId,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Item removed from wishlist");
      } else {
        toast.error("Failed to remove item from wishlist");
        // ✅ Rollback on error
        setWishListItems((prevItems) => [
          ...(Array.isArray(prevItems) ? prevItems : []),
          itemToRemove,
        ]);
      }
    } catch (err) {
      console.error("Failed to remove item from wishlist", err);
      toast.error("Failed to remove item from wishlist");
      // ✅ Rollback on error
      setWishListItems((prevItems) => [
        ...(Array.isArray(prevItems) ? prevItems : []),
        itemToRemove,
      ]);
    }
  };

  const clearWishList = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login to clear wishlist");
      return;
    }

    const currentItems = Array.isArray(wishListItems) ? wishListItems : [];

    setWishListItems([]);

    try {
      const response = await axios.delete(
        `http://localhost:3000/wishlist/clear-wishlist/${userId}`
      );
      if (response.status === 200) {
        toast.success("Wishlist cleared successfully");
      } else {
        toast.error("Failed to clear wishlist");
        setWishListItems(currentItems);
      }
    } catch (err) {
      console.error("Failed to clear wishlist", err);
      toast.error("Failed to clear wishlist");
      setWishListItems(currentItems);
    }
  };
  const moveToCart = async (productId) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login to move items to cart");
      return; 
    }
    try {

      const product = wishListItems.find((item) => item._id === productId);
      if (!product) {
        toast.error("Product not found in wishlist");
        return;
      }
      await addToCart(product);
      await removeFromWishlist(productId);
    } catch (error) {
      console.error("Failed to move item to cart", error);
      toast.error("Failed to move item to cart");
    }
  };

  return (
    <WishListContext.Provider
      value={{
        wishListItems,
        setWishListItems,
        addToWishList,
        removeFromWishlist,
        clearWishList,
        moveToCart,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

