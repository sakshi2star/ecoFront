import React from 'react';

const ConfirmationPage = () => {
  const customerAddress = JSON.parse(localStorage.getItem('customerAddress'));
  const paymentMethod = localStorage.getItem('paymentMethod');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>

      {/* Address Details */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <p>{customerAddress.name}</p>
        <p>{customerAddress.street}</p>
        <p>{customerAddress.city}, {customerAddress.zipCode}</p>
        <p>{customerAddress.country}</p>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <p>{paymentMethod}</p>
      </div>

      <button className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
        Place Order
      </button>
    </div>
  );
};

export default ConfirmationPage;
