import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(req, { params }) {
  const reviewRef = doc(db, "products", params.productId, "reviews", params.reviewId);

  try {
    await deleteDoc(reviewRef);
    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
