import React from 'react'

const BreadCrumb=(props)=> {
    const {product} = props;
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">{product.category}</h2>
    </div>
  )
}

export default BreadCrumb