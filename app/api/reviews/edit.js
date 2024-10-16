const handleReviewSubmit = async (reviewId, reviewText, reviewRating) => {
  try {
    await editReview(productId, reviewId, reviewText, reviewRating);  // Pass productId and other required data
    // Perform any additional actions like updating UI or state
  } catch (error) {
    console.error('Error updating review:', error);
  }
};
