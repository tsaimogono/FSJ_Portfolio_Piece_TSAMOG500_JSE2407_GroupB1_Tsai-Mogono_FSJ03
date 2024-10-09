import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    const product = { id: productSnap.id, ...productSnap.data() };
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch product." }), { status: 500 });
  }
}
