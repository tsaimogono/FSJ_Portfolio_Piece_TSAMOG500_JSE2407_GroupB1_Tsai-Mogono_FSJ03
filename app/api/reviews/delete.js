import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

export async function DELETE(req, { params }) {
  const { id } = params;
  const { reviewId } = await req.json();
  const paddedId = id.toString().padStart(3, "0");

  try {
    const productRef = doc(db, "products", paddedId);
    const productSnapshot = await getDoc(productRef);
    const productData = productSnapshot.data();
    const reviews = productData.reviews || [];

    if (reviewId < 0 || reviewId >= reviews.length) {
      return new Response(JSON.stringify({ error: "Review not found" }), { status: 400 });
    }

    const reviewToRemove = reviews[reviewId];
    await updateDoc(productRef, {
      reviews: arrayRemove(reviewToRemove),
    });

    return new Response(JSON.stringify({ message: "Review deleted successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete review", details: error.message }),
      { status: 500 }
    );
  }
}