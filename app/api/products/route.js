import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Fuse from 'fuse.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  try {
    let q = collection(db, "products");

    // Apply category filter
    if (category && category !== "All Categories") {
      q = query(q, where("category", "==", category));
    }

    // Apply sorting
    if (sortBy === "price") {
      q = query(q, orderBy("price", order === "asc" ? "asc" : "desc"));
    } else {
      q = query(q, orderBy(sortBy, order === "asc" ? "asc" : "desc"));
    }

    // Fetch all products matching the query
    const querySnapshot = await getDocs(q);
    let products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Apply search filter using Fuse.js
    if (search) {
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.4, // Adjust this value to make the search more or less strict
      });

      const searchResults = fuse.search(search);
      products = searchResults.map(result => result.item);
    }

    // Calculate total number of products and pages
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return new Response(JSON.stringify({
      products: paginatedProducts,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      pageSize: pageSize
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