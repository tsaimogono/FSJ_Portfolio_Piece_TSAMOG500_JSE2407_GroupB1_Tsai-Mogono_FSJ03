"use client";
import { useState, useEffect } from 'react';
import ProductGrid from '@/components/productGrid';
import Modal from '@/components/modal';
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Home Component
 * This component renders the homepage of the e-commerce site, including the navbar, product grid, and modal for viewing detailed product information.
 * 
 * @returns {JSX.Element} The Home page component.
 */

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || '';
    const sortParam = searchParams.get('sort') || '';
    const pageParam = parseInt(searchParams.get('page')) || 1;

    setSearchQuery(search);
    setCategory(categoryParam);
    setSort(sortParam);
    setPage(pageParam);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleSearchSubmit = () => {
    router.push(`/?search=${searchQuery}&category=${category}&sort=${sort}&page=1`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('');
    setSort('');
    setPage(1);
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-6">Product List</h1>

        {/* Search, Filter, Sort */}
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded mr-4"
          />
          <select value={category} onChange={handleCategoryChange} className="border p-2 rounded mr-4">
            <option value="">All Categories</option>
          </select>
          <select value={sort} onChange={handleSortChange} className="border p-2 rounded">
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <button onClick={handleSearchSubmit} className="bg-blue-500 text-white py-2 px-4 rounded ml-4">
            Search
          </button>
          <button onClick={resetFilters} className="bg-gray-500 text-white py-2 px-4 rounded ml-4">
            Reset Filters
          </button>
        </div> */}

        <ProductGrid
          searchQuery={searchQuery}
          category={category}
          sort={sort}
          page={page}
          onProductClick={handleProductClick}
        />
        {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Home;
