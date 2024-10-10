"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from './productCard';
import Pagination from './Pagination';
import { getProducts, getCategories } from '../lib/api';

// Custom debounce function
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'id';
  const order = searchParams.get('order') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({
        page,
        limit,
        sortBy,
        order,
        category: category === "All Categories" ? "" : category,
        search
      });
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, order, category, search, limit]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.categories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateUrl = useCallback((newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/?${params.toString()}`);
  }, [searchParams, router]);

  const debouncedSearch = useDebounce((value) => {
    updateUrl({ search: value, page: 1 });
  }, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    updateUrl({ search: e.target.search.value, page: 1 });
  };

  const handleCategoryChange = (e) => {
    updateUrl({ category: e.target.value, page: 1 });
  };

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split('-');
    updateUrl({ sortBy: newSortBy, order: newOrder, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateUrl({ page: newPage });
  };

  const resetFilters = () => {
    router.push('/');
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Search
        </button>
      </form>

      <div className="mb-4 flex flex-wrap items-center">
      <select
          value={category}
          onChange={handleCategoryChange}
          className="border p-2 mr-2 rounded"
        >
          <option value="All Categories">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={`${sortBy}-${order}`}
          onChange={handleSortChange}
          className="border p-2 mr-2 rounded"
        >
          <option value="id-asc">Sort by ID (Ascending)</option>
          <option value="id-desc">Sort by ID (Descending)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Top Rated</option>
        </select>

        <button
          onClick={resetFilters}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 my-8">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGrid;