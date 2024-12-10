import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export const addTaskForUser = async (userId, taskId, taskData) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await setDoc(taskRef, taskData);
    console.log('Task added successfully!');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const getTasksForUser = async (userId, filter, callback) => {
  try {
    const tasksRef = collection(db, 'users', userId, 'tasks');

    let taskQuery = tasksRef;
    if (filter !== 'all') {
      taskQuery = query(tasksRef, where('status', '==', filter));
    }

    const querySnapshot = await getDocs(taskQuery);
    const initialTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(initialTasks);

    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      debugger;
      callback(tasks);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error getting tasks for user:', error);
    throw error;
  }
};

export const updateTaskForUser = async (userId, taskId, updatedData) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, updatedData);
    console.log('Task updated successfully!');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTaskForUser = async (userId, taskId) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
    console.log('Task deleted successfully!');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const updateTaskStatus = async (userId, taskId, newStatus) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);

    await updateDoc(taskRef, { status: newStatus });

    console.log('Task status updated successfully!');
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};
