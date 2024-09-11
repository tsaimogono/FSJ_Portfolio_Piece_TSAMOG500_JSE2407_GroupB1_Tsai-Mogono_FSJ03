// pages/index.js
import { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Modal from '../components/Modal';

const ProductsPage = () => {
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

export default ProductsPage;
