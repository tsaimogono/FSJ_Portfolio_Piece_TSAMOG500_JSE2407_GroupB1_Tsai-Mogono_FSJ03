"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard'; // Ensure the case matches the filename
import Pagination from './Pagination';
import { getCategories } from '../lib/api'; // Ensure this function returns the expected structure

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
      const response = await fetch(`/api/products?page=${page}&pageSize=${limit}&sortBy=${sortBy}&order=${order}&category=${category}&search=${search}`);
      if (!response.ok) {
        throw new Error('Failed to load products');
      }
      const data = await response.json();
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
        setCategories(fetchedCategories.categories || []);
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

  const handleSearch = (e) => {
    e.preventDefault();
    updateUrl({ search: e.target.search.value, page: 1 });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value === 'All Categories' ? '' : e.target.value; // Reset category if 'All Categories' is selected
    updateUrl({ category: selectedCategory, page: 1 });
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
      <form onSubmit={handleSearch} className="mb-4 flex items-center justify-center">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          defaultValue={search}
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded hover:bg-blue-600 transition-colors">
          Search
        </button>
      </form>

      <div className="mb-4 flex flex-wrap items-center justify-center">
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
          <option value="price-asc">Sort by Price (Ascending)</option>
          <option value="price-desc">Sort by Price (Descending)</option>
          <option value="title-asc">Sort by Title (Ascending)</option>
          <option value="title-desc">Sort by Title (Descending)</option>
        </select>

        <button
          onClick={resetFilters}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGrid;
