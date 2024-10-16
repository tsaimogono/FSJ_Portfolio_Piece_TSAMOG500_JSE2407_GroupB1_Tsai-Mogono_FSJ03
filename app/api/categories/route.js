// pages/api/categories.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

/**
 * Fetch a list of product categories from Firestore.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} The API response.
 */
export default async function handler(req, res) {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}
