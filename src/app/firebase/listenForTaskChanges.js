import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from './firebase';

const listenForTaskChanges = (userId, filter = 'all', callback) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');

  let taskQuery = tasksRef;
  if (filter !== 'all') {
    taskQuery = query(tasksRef, where('status', '==', filter));
  }

  const unsubscribe = onSnapshot(taskQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(tasks);
  });

  return unsubscribe;
};

export default listenForTaskChanges;
