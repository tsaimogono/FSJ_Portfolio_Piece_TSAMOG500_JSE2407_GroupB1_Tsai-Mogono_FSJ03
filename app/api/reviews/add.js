import { db } from '../../../lib/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { verifyToken } from '../../middleware/verifyToken';

export default async function handler(req, res) {
  await verifyToken(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { productId, rating, comment } = req.body;
    const { email, name } = req.user;

    try {
      const reviewRef = collection(db, 'products', productId, 'reviews');
      await addDoc(reviewRef, {
        rating,
        comment,
        email,
        name,
        date: Timestamp.now(),
      });

      res.status(200).json({ message: 'Review added successfully' });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Error adding review' });
    }
  });
}
