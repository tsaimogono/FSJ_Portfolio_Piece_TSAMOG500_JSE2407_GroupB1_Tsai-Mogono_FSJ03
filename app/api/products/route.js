import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const limitValue = parseInt(searchParams.get("limit") || "20", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);

  try {
    let q = query(collection(db, "products"), orderBy(sortBy, order === 'asc' ? 'asc' : 'desc'));

    if (category) {
      q = query(q, where("category", "==", category));
    }
    if (search) {
      q = query(q, where("title", ">=", search), where("title", "<=", search + "\uf8ff"));
    }

    // Pagination logic
    if (skip > 0) {
      const snapshots = await getDocs(q);
      const lastVisible = snapshots.docs[skip - 1];
      q = query(q, startAfter(lastVisible));
    }

    q = query(q, limit(limitValue));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products." }), { status: 500 });
  }
}
