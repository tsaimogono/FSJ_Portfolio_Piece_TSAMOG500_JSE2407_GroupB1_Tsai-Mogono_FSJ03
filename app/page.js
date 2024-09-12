// app/page.js
"use client";
import { useState } from 'react';
import ProductGrid from '@/components/productGrid';
import Modal from '@/components/modal';
import Navbar from '@/components/Navbar';

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
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-6">Product List</h1>
      <ProductGrid onProductClick={handleProductClick} />
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default Home;
