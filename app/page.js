// app/page.js
"use client";
import { useState } from 'react';
import ProductGrid from '@/components/productGrid';
import Modal from '@/components/modal';
import Navbar from '@/components/Navbar';


/**
 * Home Component
 * This component renders the homepage of the e-commerce site, including the navbar, product grid, and modal for viewing detailed product information.
 * 
 * @returns {JSX.Element} The Home page component.
 */

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  /**
   * Handle product click event.
   * When a product is clicked, it sets the selected product to be displayed in the modal.
   * 
   * @param {Object} product - The product object that was clicked.
   */

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };


  /**
   * Close the modal by resetting the selected product.
   */
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
