// app/components/ProductGrid.js
"use client";
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { getProducts } from '../lib/api';
import Pagination from './Pagination';


/**
 * ProductGrid Component
 * Fetches and displays a grid of products along with pagination controls.
 * Handles the loading state, error state, and page changes.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onProductClick - Function that handles clicking a product card to display details.
 * 
 * @returns {JSX.Element} The ProductGrid component.
 */

const ProductGrid = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    /**
   * Fetch products whenever the page changes.
   * Handles loading and error states during the fetch process.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(page, 20);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <p>Loading...</p>;

  // If an error occurs during fetch, display an error message
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>
      <Pagination page={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default ProductGrid;
