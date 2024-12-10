import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const createDoc = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await setDoc(docRef, data);
    console.log('Document successfully created!');
  } catch (error) {
    console.error('Error creating document: ', error);
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
    console.error('Error fetching document: ', error);
  }
};

export const updateDocData = async (collectionPath, docId, data) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, data);
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const deleteDocData = async (collectionPath, docId) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    await deleteDoc(docRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

export const getCollectionData = async (collectionPath) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching collection data: ', error);
  }
};

export const getFilteredCollectionData = async (
  collectionPath,
  field,
  value
) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching filtered collection data: ', error);
  }
};
