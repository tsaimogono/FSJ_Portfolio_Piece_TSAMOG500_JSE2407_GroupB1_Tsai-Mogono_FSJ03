import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // Ensure this path is correct
import Fuse from 'fuse.js';

/**
 * Handles the GET request for fetching paginated, filtered, and sorted products.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {Response} - The outgoing response object.
 */
export async function GET(req) {
  // Extract query parameters from the URL
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 20;
  const sortBy = searchParams.get('sortBy') || 'price';
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  try {
    const productsRef = collection(db, 'products');

    // Build Firestore query
    let q = query(productsRef);
    
    // If category is specified, filter by category
    if (category) {
      q = query(q, where('category', '==', category));
    }

    // Apply sorting if sortBy is specified
    if (sortBy) {
      q = query(q, orderBy(sortBy, order));
    }

    // Fetch products from Firestore
    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Search functionality using Fuse.js if search term is provided
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      const searchResults = fuse.search(search);
      products = searchResults.map(result => result.item);
    }

    // Pagination logic
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    // Return the paginated products
    return new Response(
      JSON.stringify({
        products: paginatedProducts,
        total: products.length,
        currentPage: page,
        totalPages: Math.ceil(products.length / pageSize),
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
