// pages/product/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getProduct } from '../../api/products';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getProduct(id);
          setProduct(data);
        } catch (err) {
          setError('Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return null;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
      <p>{product.description}</p>
      <p>Price: {product.price} USD</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate} / 5</p>
      <button onClick={() => router.push('/')}>Back to Products</button>
    </div>
  );
};

export default ProductDetail;
