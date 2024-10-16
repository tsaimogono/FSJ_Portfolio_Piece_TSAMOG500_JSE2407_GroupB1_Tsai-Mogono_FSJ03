import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

export async function PUT(req, { params }) {
  const { id } = params;
  const { reviewId, comment, rating, date } = await req.json();
  const paddedId = id.toString().padStart(3, "0");

  try {
    const productRef = doc(db, "products", paddedId);
    const productSnapshot = await getDoc(productRef);
    const productData = productSnapshot.data();
    const reviews = productData.reviews || [];

    if (reviewId < 0 || reviewId >= reviews.length) {
      return new Response(JSON.stringify({ error: "Review not found" }), { status: 400 });
    }

    const updatedReviews = [...reviews];
    updatedReviews[reviewId] = { ...updatedReviews[reviewId], comment, rating, date };

    await updateDoc(productRef, {
      reviews: updatedReviews,
    });

    return new Response(JSON.stringify({ message: "Review updated successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update review", details: error.message }),
      { status: 500 }
    );
  }
}