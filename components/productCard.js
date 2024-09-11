// app/components/ProductCard.js
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4">
      <img src={product.images[0]} alt={product.title} className="w-full h-40 object-contain" />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <Link href={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
