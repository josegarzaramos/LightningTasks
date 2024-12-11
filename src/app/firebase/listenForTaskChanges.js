import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const listenForTaskChanges = (userId, filter, callback) => {
  try {
    const tasksRef = collection(db, 'users', userId, 'tasks');

    const unsubscribe = onSnapshot(tasksRef, (querySnapshot) => {
      let tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (filter && filter !== 'all') {
        tasks = tasks.filter((task) => task.status === filter);
      }

      callback(tasks);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error listening for task changes:', error);
  }
};

export default listenForTaskChanges;
