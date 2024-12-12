import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const createDoc = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, data);
    return { success: true, message: 'Document successfully created!' };
  } catch (error) {
    throw new Error(`Error creating document: ${error.message}`);
  }
};

export const getDocData = async (collectionPath, docId) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    throw new Error(`Error fetching document: ${error.message}`);
  }
};

export const updateDocData = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, data);
    return { success: true, message: 'Document successfully updated!' };
  } catch (error) {
    throw new Error(`Error updating document: ${error.message}`);
  }
};
