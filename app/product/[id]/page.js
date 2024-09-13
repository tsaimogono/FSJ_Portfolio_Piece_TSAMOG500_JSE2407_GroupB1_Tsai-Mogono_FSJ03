"use client";
import { getProduct } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Loader Component
function Loader() {
  return (
    <div className="flex justify-center items-center h-80">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await getProduct(params.id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center text-red-500 text-lg">Product not found</p>;

  // Rating stars display
  const ratingValue = product.rating?.rate ? Math.round(product.rating.rate) : 0;
  const stars = Array(ratingValue).fill().map((_, i) => (
    <svg
      key={i}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5 text-yellow-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ));

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6 hover:bg-blue-700 transition duration-300"
        onClick={() => router.push('/')}
      >
        Back to Products
      </button>

      {/* Product Image & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="relative w-full">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} image ${currentImageIndex + 1}`}
            className="w-full h-96 object-contain rounded-lg shadow-lg"
          />
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            &#8592;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            &#8594;
          </button>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-green-500 font-semibold">Price: ${product.price}</p>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-yellow-500">Rating:</span>
            <div className="flex">{stars}</div>
            <span className="ml-2 text-gray-600">({product.rating?.count || 0} reviews)</span>
            <span className="ml-2 text-gray-600">{ratingValue} / 5</span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
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
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Write a Review Section */}
        <div className="mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
