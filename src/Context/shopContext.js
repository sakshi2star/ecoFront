import { createContext, useState } from "react";
import products from "../data/data";

// Creating context for the shop
export const ShopContext = createContext();

// Helper function to get default cart structure
const getDefaultCart = () => {
  let cart = {};
  // Fixed the loop to iterate through the correct range. Before it was 'products.length+1'
  // but it should be 'products.length'. The index starts from 0 and should not exceed the length.
  for (let index = 0; index < products.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

// The provider component for managing the cart state
const ShopContextProvider = (props) => {

  // State to track cart items, initialized using getDefaultCart()
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // State to track wishlist items
  const [wishlistItems, setWishlistItems] = useState({}); // Default: no items in wishlist

   // Function to add items to the wishlist
   const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

   // Function to remove items from the wishlist
   const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => {
      const updatedWishlist = { ...prev };
      delete updatedWishlist[itemId]; // Remove item from wishlist
      return updatedWishlist;
    });
  };

  // Function to add items to the cart, updating the state accordingly
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
    
  };

  // Function to remove items from the cart, ensuring it doesn't go below zero
  const removeToCart = (itemId) => {
    // Ensure the quantity does not go negative
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  const getTotalCartItems =()=>{
    let totalItem = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalItem+=cartItems[item];
      }
    }
    return totalItem; 
  }

  const getTotalCartAmount =()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo = products.find((product)=>product.id===Number(item));
        totalAmount += itemInfo.price*cartItems[item]
      }
    }
    return totalAmount; 
  }

  // Context value containing the products and cart operations
  const contextValue = { products, cartItems, addToCart, removeToCart ,getTotalCartItems,getTotalCartAmount,addToWishlist,removeFromWishlist,wishlistItems};

  // Providing the context to the children components
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

