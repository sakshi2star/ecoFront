import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  // States to store user inputs
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  // Handle input change for address form
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (Object.values(address).some((field) => !field)) {
      alert('Please fill in all address fields');
      return;
    }

    // Store address and payment method in localStorage for review on confirmation page
    localStorage.setItem('customerAddress', JSON.stringify(address));
    localStorage.setItem('paymentMethod', paymentMethod);

    // Redirect to confirmation page
    navigate('/confirmation');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      {/* Address Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={address.name}
            onChange={handleAddressChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Street */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="street">Street Address</label>
          <input
            id="street"
            name="street"
            type="text"
            value={address.street}
            onChange={handleAddressChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={address.city}
            onChange={handleAddressChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Zip Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={address.zipCode}
            onChange={handleAddressChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            value={address.country}
            onChange={handleAddressChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Payment Options */}
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
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
          </div>

          {/* Proceed Button */}
          <Link to="/confirm">
          <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
          >
            Proceed to Confirmation
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
