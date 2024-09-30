import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from "../Context/shopContext";
import { TrashIcon } from "@heroicons/react/16/solid";

const AddTocart = () => {
  const navigate = useNavigate();
  // const cartItem = JSON.parse(localStorage.getItem('cartItem')); // Retrieve product from localStorage
  const [paymentMethod, setPaymentMethod] = useState("");
  const { products, cartItems, removeToCart,getTotalCartAmount } = useContext(ShopContext);

  const handleProceedToPayment = () => {
    if (paymentMethod === "Online Payment") {
      navigate('/payment'); // Go to payment page
    } else if (paymentMethod === "Cash on Delivery") {
      navigate('/confirmation'); // Go to confirmation page
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Product Summary */}
      <div className="bg-white shadow-lg p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <table className="table-auto w-full text-left mb-6">
          <thead>
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">Product</th>
              <th className="py-2">Size</th>
              <th className="py-2">Color</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total Price</th>
              <th className="py-2">
                <TrashIcon aria-hidden="true" className="h-6 w-6" />
              </th>
            </tr>
          </thead>

          {/* Loop through products */}
          <tbody>
            {products.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <tr key={e.id} className="border-b">
                    {/* Image Column */}
                    <td className="py-2">
                      <img
                        src={e.image} // Correct reference to `e`
                        alt={e.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    {/* Product Information */}
                    <td className="py-2">{e.name}</td>
                    <td className="py-2">{e.size}</td>
                    <td className="py-2">{e.color}</td>
                    <td className="py-2">{cartItems[e.id]}</td> {/* Use cartItems for quantity */}
                    <td className="py-2 font-bold text-lg">₹{e.price*cartItems[e.id]}</td>
                    <td className="py-2">
                      <button onClick={() => removeToCart(e.id)}>
                        <TrashIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                );
              }
              return null; // Return null for products not in the cart
            })}
          </tbody>
        </table>

      </div>

      {/* Product Image */}
      {/* <div className="mb-6">
        <img
          src={products.image}
          alt={products.name}
          className="w-64 h-64 object-cover"
        />
      </div> */}

<div className="bg-white shadow-lg p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
        <table className="table-auto w-full text-left mb-6">
          <thead>
            <tr>
              <th className="py-2">SubTotal</th>
             
            </tr>
          </thead>

          <tbody>
              <td>₹{getTotalCartAmount()}</td>
          </tbody>
        </table>

      </div>

      {/* Payment Options */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        <table className="table-auto w-full text-left mb-6">
          <tbody>
            <tr className="mb-4">
              <td>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Online Payment"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-pink-600"
                  />
                  <span className="ml-2">Online Payment</span>
                </label>
              </td>
            </tr>
            <tr className="mb-4">
              <td>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-pink-600"
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Proceed Button */}
        <Link to="/payment">
          <button
            onClick={handleProceedToPayment}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
          >
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>

  );
};

export default AddTocart;
