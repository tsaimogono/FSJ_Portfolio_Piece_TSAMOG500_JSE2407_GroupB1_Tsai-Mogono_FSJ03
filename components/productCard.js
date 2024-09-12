// app/components/ProductCard.js
import Link from 'next/link';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <div className="relative">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="w-full h-40 object-contain"
        />
        {product.images.length > 1 && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-2">
            <button
              onClick={prevImage}
              className="bg-gray-800 text-white p-1 rounded"
              disabled={currentImageIndex === 0}
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="bg-gray-800 text-white p-1 rounded"
              disabled={currentImageIndex === product.images.length - 1}
            >
              ›
            </button>
          </div>
        )}
      </div>
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p className="text-green-600 font-bold">${product.price}</p>
      <p className="text-gray-500">{product.category}</p>
      <Link href={`/product/${product.id}`}>
        <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
