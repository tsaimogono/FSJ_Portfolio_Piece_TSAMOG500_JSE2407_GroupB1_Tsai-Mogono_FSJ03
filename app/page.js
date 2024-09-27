"use client";
import { useState, useEffect } from 'react';
import ProductGrid from '../components/productGrid';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || '';
    const sortParam = searchParams.get('sort') || 'asc';
    const pageParam = parseInt(searchParams.get('page')) || 1;

    setSearchQuery(search);
    setCategory(categoryParam);
    setSort(sortParam);
    setPage(pageParam);
  }, [searchParams]);

  const handleSearchSubmit = () => {
    router.push(`/?search=${searchQuery}&category=${category}&sort=${sort}&page=1`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('');
    setSort('asc');
    setPage(1);
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-6">Product List</h1>

        {/* <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button onClick={handleSearchSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
          <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">Reset</button>
        </div> */}

        <ProductGrid
          searchQuery={searchQuery}
          category={category}
          sort={sort}
          page={page}
          setTotalPages={setTotalPages}
        />

        {/* <Pagination page={page} totalPages={totalPages} handlePageChange={(newPage) => setPage(newPage)} /> */}
      </div>
    </div>
  );
};

export default Home;
