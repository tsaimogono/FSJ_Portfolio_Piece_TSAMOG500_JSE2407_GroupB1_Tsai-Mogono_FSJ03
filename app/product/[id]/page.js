"use client";
import { getProduct } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../app/context/AuthContext'; // Adjust the import path accordingly

function Loader() {
  return (
    <div className="flex justify-center items-center h-80">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const { user } = useAuth(); // Get the authenticated user
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewSortOption, setReviewSortOption] = useState('date_desc');
  const [newReview, setNewReview] = useState({ reviewerName: '', rating: 0, comment: '' });
  const [editingReview, setEditingReview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const productId = String(params.id).padStart(3, '0');

      try {
        const productData = await getProduct(`api/products/${productId}`);
        
        if (!productData) {
          throw new Error(`Product with ID ${productId} not found.`);
        }
        
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleReviewSortChange = (e) => {
    setReviewSortOption(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleAddReview = () => {
    const updatedReviews = [...product.reviews, { ...newReview, id: Date.now().toString(), date: new Date().toISOString() }];
    setProduct({ ...product, reviews: updatedReviews });
    setNewReview({ reviewerName: '', rating: 0, comment: '' });
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ reviewerName: review.reviewerName, rating: review.rating, comment: review.comment });
  };

  const handleUpdateReview = () => {
    const updatedReviews = product.reviews.map((review) =>
      review.id === editingReview.id ? { ...editingReview, ...newReview, date: new Date().toISOString() } : review
    );
    setProduct({ ...product, reviews: updatedReviews });
    setNewReview({ reviewerName: '', rating: 0, comment: '' });
    setEditingReview(null);
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = product.reviews.filter((review) => review.id !== reviewId);
    setProduct({ ...product, reviews: updatedReviews });
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!product) return <p className="text-center text-red-500 text-lg">Product not found</p>;

  const getSortedReviews = () => {
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
      <button onClick={() => router.push('/')} className="bg-blue-500 text-white py-2 px-4 rounded mb-6 hover:bg-blue-700">
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full">
          <img src={product.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1} of ${product.title}`} className="w-full h-96 object-cover rounded-lg" />
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button onClick={handlePrevImage} className="bg-gray-500 text-white p-2 rounded-l-lg hover:bg-gray-700">Prev</button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button onClick={handleNextImage} className="bg-gray-500 text-white p-2 rounded-r-lg hover:bg-gray-700">Next</button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price}</p>
          <p className="text-lg text-gray-500">Category: {product.category}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <select value={reviewSortOption} onChange={handleReviewSortChange} className="border p-2 mb-4">
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="rating_desc">Highest Rating</option>
          <option value="rating_asc">Lowest Rating</option>
        </select>

        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-yellow-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  {/* Render empty stars */}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
              {user && (
                <>
                  <button onClick={() => handleEditReview(review)} className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDeleteReview(review.id)} className="text-red-600 hover:underline">Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {user ? (
          <div>
            <h3 className="text-lg font-semibold mt-8 mb-2">{editingReview ? 'Edit Review' : 'Add a Review'}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingReview ? handleUpdateReview() : handleAddReview();
              }}
              className="border p-4 rounded-lg shadow-sm"
            >
              <input
                type="text"
                name="reviewerName"
                value={newReview.reviewerName}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="border p-2 rounded mb-2 w-full"
                required
              />
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleInputChange}
                className="border p-2 rounded mb-2 w-full"
                required
              >
                <option value="" disabled>Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                ))}
              </select>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="Your review..."
                className="border p-2 rounded mb-4 w-full"
                required
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                {editingReview ? 'Update Review' : 'Add Review'}
              </button>
            </form>
          </div>
        ) : (
          <p className="text-red-500">You must be logged in to leave a review.</p>
        )}
      </div>
    </div>
  );
}
