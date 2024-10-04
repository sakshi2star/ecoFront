import React, { useState } from 'react';
import axios from 'axios';

const ProductUpload = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        rating: '',
        reviews: '',
        price: '',
        originalPrice: '',
        discount: '',
        image: null,
        thumbnails: [],
        category: '',
        sizes: '',
        colors: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setProductData({ ...productData, image: files[0] });
        } else if (name === 'thumbnails') {
            // Make sure we handle multiple files correctly
            setProductData({ ...productData, thumbnails: Array.from(files) });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object
        const formData = new FormData();

        // Append product data to the FormData
        Object.entries(productData).forEach(([key, value]) => {
            if (key === 'thumbnails') {
                // Append each thumbnail file separately
                value.forEach(file => formData.append('thumbnails', file));
            } else if (key === 'image') {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });

        try {
            const response = await axios.post('http://localhost:5000/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-red-400'>
            <input type="text" name="name" onChange={handleChange} placeholder="Product Name" required /><br />
            <textarea name="description" onChange={handleChange} placeholder="Product Description" required /><br />
            <input type="number" name="rating" onChange={handleChange} placeholder="Rating" required /><br />
            <input type="number" name="reviews" onChange={handleChange} placeholder="Reviews" required /><br />
            <input type="number" name="price" onChange={handleChange} placeholder="Price" required /><br />
            <input type="number" name="originalPrice" onChange={handleChange} placeholder="Original Price" required /><br />
            <input type="text" name="discount" onChange={handleChange} placeholder="Discount" required /><br />
            <input type="file" name="image" onChange={handleChange} accept="image/*" required /><br />
            <input type="file" name="thumbnails" onChange={handleChange} accept="image/*" multiple required /><br />
            <input type="text" name="category" onChange={handleChange} placeholder="Category" required /><br />
            <input type="text" name="sizes" onChange={handleChange} placeholder="Sizes (comma separated)" /><br />
            <input type="text" name="colors" onChange={handleChange} placeholder="Colors (comma separated)" /><br />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductUpload;
