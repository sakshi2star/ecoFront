import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    // Handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);  // Store the selected image
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a form data object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);  // Add the image to the form data

        try {
            // Send a POST request to the backend
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);  // Success message from server
        } catch (error) {
            console.error(error); // Log the error for debugging
            setMessage('Failed to upload image'); // Display error message
        }
    };

    return (
        <div className="container">
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Select Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" className='bg-cyan-400'>Upload</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ImageUpload;
