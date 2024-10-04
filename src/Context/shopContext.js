import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import products from "../data/data";

// Creating context for the shop
export const ShopContext = createContext();

// Helper function to get default cart structure
const getDefaultCart = () => {
  let cart = {};
  // Fixed the loop to iterate through the correct range. Before it was 'products.length+1'
  // but it should be 'products.length'. The index starts from 0 and should not exceed the length.
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

// The provider component for managing the cart state
const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([])
  // State to track cart items, initialized using getDefaultCart()
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    // Define an async function to fetch the products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allProduct');

        // Update state with the fetched products
        setProducts(response.data);

        // Check if user is authenticated and fetch cart items
        if (localStorage.getItem('authToken')) {
          const cartResponse = await fetch('http://localhost:5000/getCart', {
            method: 'POST',
            headers: {
              Accept: 'application/json', // Change this to application/json for JSON response
              'authToken': localStorage.getItem('authToken'),
              'Content-Type': 'application/json',
            },
          });

          // Check if response is ok
          if (!cartResponse.ok) {
            throw new Error('Failed to fetch cart items');
          }

          const cartData = await cartResponse.json(); // Correctly retrieve JSON data
          setCartItems(cartData); // Set the fetched cart items to state
        }

      } catch (error) {
        console.error('Error fetching products or cart items:', error);
        // Optionally show an alert or message in case of error
      }
    };

    // Call the async function to fetch products
    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once after the component mounts




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

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1  // Increment the item count or initialize it to 1
    }));

    // Check if the user is authenticated before making the request
    if (localStorage.getItem('authToken')) {
      fetch('http://localhost:5000/addToCart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'authToken': `${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": itemId })  // Correctly stringify the body
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);  // Handle the response data
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);  // Handle any errors
        });
    }
  };


  // Function to remove items from the cart, ensuring it doesn't go below zero
  // const removeToCart = (itemId) => {
  //   // Ensure the quantity does not go negative
  //   setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  // };

  const removeToCart = (itemId) => {
    // Check if the user is authenticated before making the request
    if (!localStorage.getItem('authToken')) {
      console.error('User is not authenticated');
      return; // Exit the function if not authenticated
    }
  
    // Update the local state for the cart item count
    setCartItems((prev) => {
      const currentCount = prev[itemId] || 0;
  
      // Only decrement if the current count is greater than 0
      if (currentCount > 0) {
        return {
          ...prev,
          [itemId]: currentCount - 1 // Decrease the count
        };
      }
      
      return prev; // Return the previous state if count is 0 or less
    });
  
    // Send the request to remove the item from the cart on the server
    fetch('http://localhost:5000/removeFromCart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'authToken': localStorage.getItem('authToken'), // Use the stored token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: itemId }), // Correctly stringify the body
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Handle the response data
        // You may want to add additional logic here to handle UI updates based on the response
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error); // Handle any errors
      });
  };
  
  

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }

  const getTotalwishlistItems = () => {
    let totalItem = 0;
    for (const item in wishlistItems) {
      if (wishlistItems[item] > 0) {
        totalItem += wishlistItems[item];
      }
    }
    return totalItem;
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount;
  }

  // Context value containing the products and cart operations
  const contextValue = { products, cartItems, addToCart, removeToCart, getTotalCartItems, getTotalCartAmount, addToWishlist, removeFromWishlist, wishlistItems, getTotalwishlistItems };

  // Providing the context to the children components
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

