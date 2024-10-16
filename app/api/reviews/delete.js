// Assuming productId is available in your page component
const handleReviewDelete = async (reviewId) => {
  try {
    await deleteReview(productId, reviewId);  // Pass both productId and reviewId
    // Perform any additional actions like updating UI or state
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};
