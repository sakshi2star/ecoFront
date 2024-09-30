import React, { useContext } from 'react';
import { ShopContext } from '../Context/shopContext'
import { useParams } from 'react-router-dom';
import BreadCrumb from '../item/breadCrumb';
import ItemDisplay from '../item/itemDisplay';

const Product = () => {

  const { products } = useContext(ShopContext);
  const { productId } = useParams();

  // Find the product by ID
  const product = products.find((e) => e.id === Number(productId));

  // Handle product not found
  if (!product) {
    return <div>Product not found.</div>;
  }


  return (
    <>
  
      <BreadCrumb product={product} />
      <ItemDisplay product={product}/>
      
     
    </>
  )
}

export default Product