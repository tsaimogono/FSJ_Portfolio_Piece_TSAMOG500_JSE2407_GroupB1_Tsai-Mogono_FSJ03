// pages/api/products/index.js (or your specific API route file)
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Fuse from 'fuse.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categories = searchParams.get("categories")?.split(',').filter(Boolean) || [];
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  try {
    let q = collection(db, "products");
    let queryConstraints = [];

    // Apply category filter
    if (categories.length > 0 && !categories.includes("All Categories")) {
      if (categories.length > 10) {
        return new Response(JSON.stringify({ error: "Cannot filter by more than 10 categories." }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      queryConstraints.push(where("category", "in", categories));
    }

    // Apply sorting
    queryConstraints.push(orderBy(sortBy, order === "asc" ? "asc" : "desc"));

    // Apply pagination
    queryConstraints.push(limit(pageSize));

    if (page > 1) {
      // Fetch the last document of the previous page
      const prevPageQuery = query(q, ...queryConstraints, limit((page - 1) * pageSize));
      const prevPageSnapshot = await getDocs(prevPageQuery);
      const lastVisibleDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];
      if (lastVisibleDoc) {
        queryConstraints.push(startAfter(lastVisibleDoc));
      }
    }

    // Apply all constraints
    q = query(q, ...queryConstraints);

    // Fetch paginated products
    const querySnapshot = await getDocs(q);
    let products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Apply search filter using Fuse.js
    if (search) {
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.4,
      });

      const searchResults = fuse.search(search);
      products = searchResults.map(result => result.item);
    }

    // Fetch total count (considering category filter)
    let countQuery = collection(db, "products");
    if (categories.length > 0 && !categories.includes("All Categories")) {
      countQuery = query(countQuery, where("category", "in", categories));
    }
    const countSnapshot = await getDocs(countQuery);
    const totalProducts = countSnapshot.size;

    const totalPages = Math.ceil(totalProducts / pageSize);

    return new Response(JSON.stringify({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      pageSize
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
