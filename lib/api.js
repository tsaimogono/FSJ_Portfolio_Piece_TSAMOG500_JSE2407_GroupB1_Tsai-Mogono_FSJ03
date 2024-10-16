// pages/api/products.js
import { collection, getDocs, query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Fuse from 'fuse.js';

/**
 * Fetch paginated, filtered, and sorted products from Firestore with optional search functionality.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} The API response.
 */
export default async function handler(req, res) {
  const { page = 1, pageSize = 20, sortBy = 'price', order = 'asc', category = '', search = '' } = req.query;
  const productsRef = collection(db, 'products');
  
  try {
    // Build Firestore query
    let q = query(productsRef);
    
    if (category) {
      q = query(productsRef, where('category', '==', category));
    }

    if (sortBy) {
      q = query(q, orderBy(sortBy, order));
    }

    // Fetch all products from Firestore
    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Use Fuse.js for search by title
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      const searchResults = fuse.search(search);
      products = searchResults.map(result => result.item);
    }

    // Pagination logic
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    // Send response
    res.status(200).json({
      products: paginatedProducts,
      total: products.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(products.length / pageSize),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// lib/api.js
export async function getProduct(endpoint) {
  try {
    const response = await fetch(`/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null;
  }
}

