import React, { useContext } from 'react';
import './item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/shopContext';

function Item(props) {

  const {addToCart,addToWishlist}=useContext(ShopContext)

  return (
    <div className="mt-4">
      <div className="card">
        {/* Card Component */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">

          <Link to={`/product/${props.id}`}>
            <img onClick={window.scrollTo(0,0)} className="w-full h-56 object-cover" src={props.image} alt={props.name} />
          </Link>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{props.name}</h2>
            <p className="text-gray-600 text-sm mt-2 truncate">
              {props.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">₹{props.price}</span>
              <span className="text-sm font-semibold text-pink-500">{props.discount} OFF</span>
            </div>
            <button onClick={()=>addToCart(props.id)} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300">
                Add to Bag
            </button>
            <button onClick={()=>addToWishlist(props.id)} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300">
            ❤️ wishList
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
