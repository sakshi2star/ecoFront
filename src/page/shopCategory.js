import React, { useContext, useEffect, useCallback, useState } from 'react';
import { ShopContext } from '../Context/shopContext';
import Item from '../item/item';

function ShopCategory(props) {
  const { products } = useContext(ShopContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Get the number of slides from the banners passed as props
  // Ensure slides is defined; set a default value if it's undefined
  const slides = props.banners || []; // Ensure slides are taken from props.banners

  // Memoize the nextSlide function so it doesn't get recreated on every render
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Automatically transition to the next slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [nextSlide]);

  return (
    <div className="mt-4 px-4">

      {slides.length > 0 && (
        <div className='banner'>
          <div className="relative h-72 overflow-hidden rounded-lg md:h-[500px]">
            {slides.map((banner, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">{props.category}</h2>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products
          .filter(product => product.category === props.category) // Filter products based on category
          .map((product) => (

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

export default ShopCategory;
