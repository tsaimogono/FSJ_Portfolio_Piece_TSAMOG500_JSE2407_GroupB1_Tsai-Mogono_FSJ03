/**
 * API routes to handle product reviews: add, edit, and delete reviews.
 * Uses Firebase Firestore for data storage and Firebase Authentication for user verification.
 */

import { db } from '../../lib/firebase';  // Firebase setup
import { authenticateUser } from '../middleware/authenticateUser';  // Authentication middleware

/**
 * Adds a review for a product.
 * @param {object} req - The request object containing productId and review details.
 * @param {object} res - The response object with success or failure message.
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await authenticateUser(req, res, async () => {
      const { productId, review } = req.body;
      
      try {
        const productRef = db.collection('products').doc(productId);
        const newReview = {
          reviewerName: req.user.displayName,
          reviewerEmail: req.user.email,
          rating: review.rating,
          comment: review.comment,
          date: new Date().toISOString(),
        };
        await productRef.update({
          reviews: firebase.firestore.FieldValue.arrayUnion(newReview),
        });
        res.status(200).json({ message: 'Review added successfully', newReview });
      } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
      }
    });
  } else if (req.method === 'PUT') {
    await authenticateUser(req, res, async () => {
      const { productId, reviewId, updatedReview } = req.body;

      try {
        const productRef = db.collection('products').doc(productId);
        const productSnap = await productRef.get();
        const reviews = productSnap.data().reviews || [];

        const reviewIndex = reviews.findIndex((r) => r.id === reviewId);
        if (reviewIndex === -1) return res.status(404).json({ message: 'Review not found' });

        reviews[reviewIndex] = { ...reviews[reviewIndex], ...updatedReview, date: new Date().toISOString() };
        await productRef.update({ reviews });
        res.status(200).json({ message: 'Review updated successfully', updatedReview });
      } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
      }
    });
  } else if (req.method === 'DELETE') {
    await authenticateUser(req, res, async () => {
      const { productId, reviewId } = req.body;

      try {
        const productRef = db.collection('products').doc(productId);
        const productSnap = await productRef.get();
        const reviews = productSnap.data().reviews || [];

        const updatedReviews = reviews.filter((r) => r.id !== reviewId);
        await productRef.update({ reviews: updatedReviews });
        res.status(200).json({ message: 'Review deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
