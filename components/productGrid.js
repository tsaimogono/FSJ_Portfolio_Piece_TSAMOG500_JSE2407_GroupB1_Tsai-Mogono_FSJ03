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
  
  // State for search, category, and sort
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('asc');

  // Fetch products when the page changes
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

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => !category || product.category === category)
    .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Search, Filter, and Sort controls */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mx-2"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
          {/* Add more categories as needed */}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
        <button
          onClick={() => {
            setSearch('');
            setCategory('');
            setSort('asc');
            setPage(1);
          }}
          className="bg-red-500 text-white p-2 ml-2"
        >
          Reset
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination page={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default ProductGrid;
