/**
 * Review form component for adding or editing a product review.
 * @param {object} props - Props containing productId, existing review, and whether it is an edit operation.
 */
import { useState } from 'react';
import { useAuth } from '../app/context/AuthContext';

export default function ReviewForm({ productId, existingReview, isEdit }) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { rating, comment, reviewerName: user.displayName, reviewerEmail: user.email };

    const response = await fetch(`/api/reviews`, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, review: reviewData }),
    });

    if (response.ok) {
      alert(isEdit ? 'Review updated successfully' : 'Review added successfully');
      window.location.reload();
    } else {
      alert('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating (out of 5):</label>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" required />

      <label htmlFor="comment">Comment:</label>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />

      <button type="submit">{isEdit ? 'Update Review' : 'Add Review'}</button>
    </form>
  );
}
