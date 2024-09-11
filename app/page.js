// pages/index.js
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 20; // Limit of products per page

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(page, limit);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
            <h2>{product.title}</h2>
            <p>{product.price} USD</p>
            <Link href={`/product/${product.id}`}>
              <a>View Details</a>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination mt-4">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span className="mx-2">Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default ProductsPage;
