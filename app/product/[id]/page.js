import { getProduct } from '../../../lib/api';

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} className="w-full h-60 object-contain" />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating} </p>
    </div>
  );
}
