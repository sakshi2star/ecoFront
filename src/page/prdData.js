import React, { useEffect } from 'react';

const AddProductData = () => {
  useEffect(() => {
    const product1 = {
      name: "Mast & Harbour - Men Slim Fit Checked Casual Shirt",
      size: "Medium",
      color: "Red",
      quantity: 1,
      price: 573,
      image: "./girl1.jpeg" // Replace with actual image path or URL
    };

    const product2 = {
      name: "Roadster - Men Checked Slim Fit Casual Shirt",
      size: "Large",
      color: "Blue",
      quantity: 2,
      price: 749,
      image: "./girl2.jpeg" // Replace with actual image path or URL
    };

    // Save products to localStorage
    localStorage.setItem('cartItem', JSON.stringify(product1));
    localStorage.setItem('cartItem2', JSON.stringify(product2));

    console.log('Products added to cart.');
  }, []);

  return <div>Product data added to localStorage</div>;
};

export default AddProductData;
