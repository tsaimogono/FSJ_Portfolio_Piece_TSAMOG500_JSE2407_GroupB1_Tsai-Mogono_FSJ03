// components/ProductGrid.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(page);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                </a>
              </Link>
            </div>
          ))}
          <div>
            <button onClick={() => handlePageChange(page - 1)}>Previous</button>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;