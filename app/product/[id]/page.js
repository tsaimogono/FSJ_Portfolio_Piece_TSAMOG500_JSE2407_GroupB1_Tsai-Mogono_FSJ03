"use client";
import { getProduct } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

/**
 * Loader Component
 * Displays a loading spinner while content is being fetched.
 * @returns {JSX.Element} Loader component with a spinner.
 */
function Loader() {
  return (
    <div className="flex justify-center items-center h-80">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

/**
 * ProductDetailPage Component
 * Fetches and displays detailed information about a product, including images, price, category, rating, and reviews.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the product to fetch details for.
 * 
 * @returns {JSX.Element} The product detail page.
 */
export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // State for sorting reviews
  const [reviewSortOption, setReviewSortOption] = useState('date_desc'); // default sort by date descending

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
  const stars = Array(ratingValue)
    .fill()
    .map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        />
      </svg>
    ));

  /**
   * Handle the previous image in the carousel.
   * Switches to the previous image in the product's image list.
   */
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  /**
   * Handle the next image in the carousel.
   * Switches to the next image in the product's image list.
   */
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Handle sorting option change for reviews.
   * @param {Event} e - The change event.
   */
  const handleReviewSortChange = (e) => {
    setReviewSortOption(e.target.value);
  };

  /**
   * Sort reviews based on the selected sort option.
   * @returns {Array} Sorted reviews array.
   */
  const getSortedReviews = () => {
    if (!product.reviews) return [];

    const sortedReviews = [...product.reviews];

    switch (reviewSortOption) {
      case 'date_asc':
        sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date_desc':
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating_asc':
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating_desc':
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sortedReviews;
  };

  const sortedReviews = getSortedReviews();

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
          {product.images.length > 1 && (
            <>
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
            </>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-purple-900 font-semibold">Price: ${product.price}</p>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-yellow-400">Rating:</span>
            <div className="flex">{stars}</div>
            <span className="ml-1 text-gray-600">{product.rating.toFixed(1) || 0}</span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

        {/* Sorting Controls for Reviews */}
        <div className="flex justify-end mb-4">
          <label htmlFor="review-sort" className="mr-2 text-gray-700 font-medium">
            Sort Reviews By:
          </label>
          <select
            id="review-sort"
            value={reviewSortOption}
            onChange={handleReviewSortChange}
            className="border p-2 rounded"
          >
            <option value="date_desc">Date: Newest First</option>
            <option value="date_asc">Date: Oldest First</option>
            <option value="rating_desc">Rating: High to Low</option>
            <option value="rating_asc">Rating: Low to High</option>
          </select>
        </div>

        {/* Reviews List */}
        {sortedReviews && sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
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
                      className="w-4 h-4 text-yellow-400"
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
          <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-purple-400 transition duration-300">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
