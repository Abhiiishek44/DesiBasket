import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
// 1. Export the actual context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
   
    useEffect(() => {
    const fetchCartItems =async ()=>{
        const userId = localStorage.getItem("id");
        if(userId){
            try{
                const response = await axios.get(`http://localhost:3000/cart/${userId}`);
                if(response.status === 200){
                    setCartItem(response.data.cart.items.map(item => ({
                        ...item.product,
                        quantity: item.quantity})));
                }
            }catch(err){
                console.error("Failed to fetch cart items", err);
                toast.error("Failed to fetch cart items");
            }
        }
    }
    fetchCartItems();
},[]);

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

    const userId = localStorage.getItem("id");
    const productId = product._id;

    const Response = await axios.post("http://localhost:3000/cart/add", {
       userId: userId,
          productId: productId
    });
    if (Response.status === 200) {
      toast.success(` ${product.name} added to cart`);
    }
  };

  const removeFromCart = async (productId) => {
  // Store the item being removed for potential rollback
  const removedItem = cartItem.find(item => item._id === productId);

  setCartItem((prevItems) =>
    prevItems.filter((item) => item._id !== productId)
  );

  try {
    const userId = localStorage.getItem("id");
    
    if (!userId) {
      toast.error("Please login to manage cart");
    }
    const response = await axios.delete(`http://localhost:3000/cart/remove`, {
      data: { 
        productId: productId,
        userId: userId
      }
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
        const userId = localStorage.getItem("id");
        if (!userId) {
          toast.error("Please login to update cart");
          return;
        }
        if (quantity < 1) {
          toast.error("Quantity must be at least 1");
          return;
        } 
        try{
            const response = await axios.put("http://localhost:3000/cart/update-quantity", {
                userId: userId,
                productId: productId,
                quantity: quantity
            });
            if(response.status === 200){
                setCartItem((prevItems)=>{
                   return prevItems.map(item=>
                       item._id === productId ? {...item, quantity: quantity} : item
                   )
                })

            }
        }catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error("Failed to update cart item quantity");
    }
 }

 const getTotalItems=()=>{
    return cartItem.reduce((total,item)=> total + item.quantity, 0);
 }
 const getTotalPrice = () => {
    return cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ cartItem, addToCart, removeFromCart,updateQuantity, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

