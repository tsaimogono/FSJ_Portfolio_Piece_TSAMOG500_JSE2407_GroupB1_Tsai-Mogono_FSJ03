/**
 * Reviews list component that displays all reviews for a product.
 * @param {object} props - Props containing productId and the list of reviews.
 */
import { useAuth } from '../app/context/AuthContext';
import { useState } from 'react';

export default function ReviewsList({ reviews, productId }) {
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState(null);

  const handleDelete = async (reviewId) => {
    const response = await fetch(`/api/reviews`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, reviewId }),
    });

    if (response.ok) {
      alert('Review deleted successfully');
      window.location.reload();
    } else {
      alert('Error deleting review');
    }
  };

  return (
    <div>
      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <h4>{review.reviewerName}</h4>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}/5</p>
            {user?.email === review.reviewerEmail && (
              <div>
                <button onClick={() => setEditingReview(review)}>Edit</button>
                <button onClick={() => handleDelete(review.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
