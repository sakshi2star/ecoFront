import React from 'react';
import products from '../data/data';
import Item from './item';

function NewArrival() {
  return (
    <div className="mt-4 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">New Arrivals</h2>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Item
            key={product.id}
            id={product.id}  
            name={product.name}
            description={product.description}
            price={product.price}
            discount={product.discount}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default NewArrival;
