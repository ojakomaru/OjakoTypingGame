import { addDoc, collection, doc, DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
// eslint-disable-next-line import/no-cycle
import { db } from '../Config';

export const insertData = async (table: string, data: Object, id: string | null = null) => {
  let docRef: void | DocumentReference<Object, DocumentData>;
  try {
    docRef = id ? await setDoc(doc(db, table, id), data) : await addDoc(collection(db, table), data);
    console.log('Documentに書き込みました: ', docRef);
  } catch (e) {
    console.error('Documentの追加でErrorが発生しました: ', e);
  }
};
