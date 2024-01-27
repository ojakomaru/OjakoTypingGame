import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  SetOptions,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../Config";

export const useInsertData = async (
  table: string,
  data: Object,
  id: string | null = null
) => {
  const [complate, setComplate] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  let docRef: void | DocumentReference<Object, DocumentData>;
  try {
    docRef = id
      ? await setDoc(doc(db, table, id), data)
      : await addDoc(collection(db, table), data);
    console.log("Document written with ID: ", docRef);
    setComplate(true);
  } catch (e) {
    console.error("Error adding document: ", e);
    setError(e as Error);
  }

  return { complate, error };
};
