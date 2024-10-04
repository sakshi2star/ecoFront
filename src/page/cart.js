import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../Context/shopContext";
import { TrashIcon } from "@heroicons/react/16/solid";

const AddToCart = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { products, cartItems, removeToCart, getTotalCartAmount } = useContext(ShopContext);

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method"); // Improved feedback
      return;
    }

    const route = paymentMethod === "Online Payment" ? '/payment' : '/confirmation';
    navigate(route); // Navigate based on selected payment method
  };

  const hasProductsInCart = Object.keys(cartItems).some((id) => cartItems[id] > 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Product Summary */}
      <div className="bg-white shadow-lg p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        {/* Check if the cart has products */}
        {hasProductsInCart ? (
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
            <tbody>
              {products.map((product) => {
                if (cartItems[product.id] > 0) {
                  return (
                    <tr key={product.id} className="border-b">
                      <td className="py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">{product.size}</td>
                      <td className="py-2">{product.color}</td>
                      <td className="py-2">{cartItems[product.id]}</td>
                      <td className="py-2 font-bold text-lg">₹{product.price * cartItems[product.id]}</td>
                      <td className="py-2">
                        <button onClick={() => removeToCart(product.id)}>
                          <TrashIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4">
            <p className="text-lg text-gray-600">No Products in Cart</p>
          </div>
        )}
      </div>

      {/* Cart Total Section */}
      {hasProductsInCart && (
        <div className="bg-white shadow-lg p-4 mb-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <table className="table-auto w-full text-left mb-6">
            <thead>
              <tr>
                <th className="py-2">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">₹{getTotalCartAmount()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

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
        <button
          onClick={handleProceedToPayment}
          className={`text-white px-6 py-2 rounded-md ${
            hasProductsInCart ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-400'
          }`}
          disabled={!hasProductsInCart} // Disable if no products in cart
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
