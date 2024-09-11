// app/page.js

"use client"
import { useState } from 'react';
import ProductGrid from '../components/productGrid';
import Modal from '../components/modal';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ProductGrid onProductClick={handleProductClick} />
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default Home;
