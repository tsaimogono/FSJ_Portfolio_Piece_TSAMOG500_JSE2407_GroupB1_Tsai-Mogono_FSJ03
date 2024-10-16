import Link from 'next/link';
import { useState } from 'react';

/**
 * ProductCard Component
 * Displays product information such as title, price, category, image, and rating.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object containing details like title, price, images, and category.
 * 
 * @returns {JSX.Element} The ProductCard component.
 */

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate star elements based on the rating value
  const ratingValue = product.rating ? Math.round(product.rating) : 0;
  const stars = Array(ratingValue).fill().map((_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4 text-yellow-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
      />
    </svg>
  ));

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="relative h-48 overflow-hidden flex justify-center items-center">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="object-contain max-h-full w-auto"
        />
        {product.images.length > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-2">
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              className="bg-gray-800 text-white p-1 rounded-full"
              disabled={currentImageIndex === 0}
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              className="bg-gray-800 text-white p-1 rounded-full"
              disabled={currentImageIndex === product.images.length - 1}
            >
              ›
            </button>
          </div>
        )}
      </div>
      <h2 className="text-lg font-bold mt-3 text-center">{product.title}</h2>
      <p className="text-purple-900 font-bold text-center">${product.price}</p>
      <p className="text-gray-800 text-sm text-center">{product.category}</p>
      <div className="flex items-center justify-center mt-2">
        {stars}
        <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
      </div>
      <Link href={`/product/${product.id}`}>
        <button className="bg-blue-500 text-white w-full py-2 mt-3 rounded-lg transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
