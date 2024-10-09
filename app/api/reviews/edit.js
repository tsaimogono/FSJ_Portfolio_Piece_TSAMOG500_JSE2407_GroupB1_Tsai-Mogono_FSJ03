import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req, { params }) {
  const { rating, comment } = await req.json();
  const reviewRef = doc(db, "products", params.productId, "reviews", params.reviewId);

  try {
    await updateDoc(reviewRef, { rating, comment, date: new Date().toISOString() });
    return NextResponse.json({ message: "Review updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
