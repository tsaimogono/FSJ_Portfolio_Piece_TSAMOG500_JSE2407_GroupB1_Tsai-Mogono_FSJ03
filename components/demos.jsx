// ProductGrid.jsx
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination.js';




const ProductGrid = () => {
  const [products, setProducts] = useState([]); // Store product data
  const [search, setSearch] = useState(''); // Search query
  const [category, setCategory] = useState(''); // Selected category
  const [sort, setSort] = useState('asc'); // Sort order
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // Items per page

  useEffect(() => {
    // Simulating fetching products from an API
    const fetchProducts = async () => {
      // This should be replaced with your API call
      const response = await fetch('/api/products'); // Adjust this path
      const data = await response.json();
      setProducts(data);
    };
    
    fetchProducts();
  }, []);

  // Handle filtering, sorting, and searching
  const filteredProducts = products
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter(product => !category || product.category === category)
    .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Get current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bound pages
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setSort('asc');
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border p-2'
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border p-2'
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
          className='border p-2'
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
        <button onClick={resetFilters} className='bg-red-500 text-white p-2'>
          Reset
        </button>
      </div>

      <div className='grid grid-cols-4 gap-4 mt-4'>
        {currentProducts.map((product) => (
          <div key={product.id} className='border p-4'>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGrid;
