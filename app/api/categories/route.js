import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    // Reference the subcollection within 'allCategories' document
    const subCollectionRef = doc(db, "categories", "allCategories");
    const querySnapshot = await getDoc(subCollectionRef);

    // Map over the documents to extract the category names
    const categories = querySnapshot.data();

    // Return the categories in a successful response
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error); // Log the detailed error
    return new Response(JSON.stringify({ error: "Failed to fetch categories." }), { status: 500 });
  }
}