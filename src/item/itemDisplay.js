import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/shopContext";

const ItemDisplay = (props) => {

    const { product } = props;
    const {addToCart,addToWishlist} = useContext(ShopContext)

    // List of images for the product
    const productImages = [
        "./girl2.jpeg",
        "./girl2.jpeg",
        "./girl2.jpeg",
        "./girl2.jpeg"
    ];

    // State to track the currently selected image
    const [selectedImage, setSelectedImage] = useState(productImages[0]);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Section - Image Gallery */}
                <div className="flex flex-col items-center">
                    {/* Main Image Display */}
                    <img
                        src={product.image}
                        alt="Selected Shirt"
                        className="max-w-full h-full mb-4"
                    />

                    {/* Thumbnail Images */}
                    {product.thumbnails && product.thumbnails.length > 0 && (
                        <div className="flex space-x-2">
                            {product.thumbnails.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Shirt Thumbnail ${index + 1}`}
                                    className={`w-full h-32 rounded-md cursor-pointer border-2 ${selectedImage === image ? "border-pink-600" : "border-gray-300"
                                        }`}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Section - Product Details */}
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-lg mt-2">{product.description}</p>

                    {/* Ratings */}
                    <div className="flex items-center mt-4">
                        <span className="text-green-600 font-semibold text-lg">{product.rating}</span>
                        {product.reviews && <span className="ml-2 text-sm">({product.reviews})</span>}

                    </div>

                    {/* Price Section */}
                    <div className="mt-4">
                        <span className="text-2xl font-bold text-pink-600">₹{product.price}</span>
                        <span className="ml-2 line-through text-gray-500">₹{product.originalPrice}</span>
                        <span className="ml-2 text-pink-600 font-semibold">{product.discount}</span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>

                    {/* Color Options */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-md font-semibold">More Colors</h3>
                            <div className="flex space-x-2 mt-2">
                                {/* <img
                                src="other-color-url1"
                                alt="Color option 1"
                                className="w-16 h-16 rounded-md"
                            />
                            <img
                                src="other-color-url2"
                                alt="Color option 2"
                                className="w-16 h-16 rounded-md"
                            /> */}
                                {product.colors.map((color, index) => (
                                    <img
                                        key={index}
                                        src={color} // Assuming colors are URLs of the color images
                                        alt={`Color option ${index + 1}`}
                                        className="w-16 h-16 rounded-md cursor-pointer"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size Options */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-md font-semibold">Select Size</h3>
                            <div className="flex space-x-4 mt-2">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        className="border px-4 py-2 rounded-md hover:bg-pink-100"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                       
                        <button onClick={()=>addToCart(product.id)} className="bg-pink-600 text-white px-6 py-2 rounded-md">
                            Add to Bag
                        </button>
                    
                        <button onClick={()=>addToWishlist(product.id)} className="border px-6 py-2 rounded-md">Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
      


export default ItemDisplay;
