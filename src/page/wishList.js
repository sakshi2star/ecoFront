import React, { useContext } from "react";
import { ShopContext } from "../Context/shopContext";


const Wishlist = () => {
  const { products, wishlistItems } = useContext(ShopContext);

  // Check if products and wishlistItems exist
  if (!products || !wishlistItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

      <div className="bg-white shadow-lg p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
        <table className="table-auto w-full text-left mb-6">
          <thead>
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">Product</th>
            </tr>
          </thead>

          <tbody>
            {products.map((e) => {
              // Check if the product is in the wishlist and has a valid quantity
              if (wishlistItems[e.id] && wishlistItems[e.id] > 0) {
                return (
                  <tr key={e.id} className="border-b">
                    <td className="py-2">
                      <img
                        src={e.image}
                        alt={e.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-2">{e.name}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;

