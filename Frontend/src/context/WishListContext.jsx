import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const WishListContext = createContext();

export function WishListProvider({ children }) {
  const [wishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    const fetchWishListItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/wishlist/get-items`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log(
            "Wishlist items fetched:",
            response.data.wishlist.items[0]
          );
          setWishListItems(
            response.data.wishlist.items.map((item) => ({
              ...item.product,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch wishlist items", err);
      }
    };
    fetchWishListItems();
  }, []);

  const addToWishList = async (product) => {
    const existingItem = wishListItems.find((item) => item._id === product._id);
    if (existingItem) {
      toast.info("Item already in wishlist");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/wishlist/add-to-wishlist",
        {
          productId: product._id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setWishListItems((prevItems) => [...prevItems, product]);
        toast.success(`${product.name} added to wishlist`);
      }
    } catch (err) {
      console.error("Failed to add product to wishlist", err);
      toast.error("Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishListItems((items) => items.filter((item) => item._id !== productId));
    const response = await axios.delete(
      "http://localhost:3000/wishlist/remove-from-wishlist",
      {
        data: {
          productId: productId,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast.success("Item removed from wishlist");
    } else {
      toast.error("Failed to remove item from wishlist");
    }
  };

  const clearWishList = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/wishlist/clear-wishlist`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setWishListItems([]);
        toast.success("Wishlist cleared successfully");
      }
    } catch (err) {
      console.error("Failed to clear wishlist", err);
      toast.error("Failed to clear wishlist");
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
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
