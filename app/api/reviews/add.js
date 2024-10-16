import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

export async function POST(req, { params }) {
  const { id } = params;
  const paddedId = id.toString().padStart(3, "0");

  const newReview = await req.json();

  try {
    const productRef = doc(db, "products", paddedId);
    await updateDoc(productRef, {
      reviews: arrayUnion(newReview),
    });
    return new Response(JSON.stringify({ message: "Review added successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add review", details: error.message }),
      { status: 500 }
    );
  }
}