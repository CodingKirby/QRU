import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export const saveToFirestore = async (
  collectionName: string,
  data: Record<string, unknown>
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw new Error("Failed to save data to Firestore");
  }
};
