import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from './assets/mockData';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2"><strong>ID:</strong> {product.id}</p>
      <p className="mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="mb-4"><strong>Price:</strong> {product.price}</p>
      <Link to="/products" className="text-blue-500 underline">Back to Products</Link>
    </div>
  );
};

export default ProductDetailsPage;
