import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const addTaskForUser = async (userId, taskId, taskData) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await setDoc(taskRef, taskData);
    return { success: true, message: 'Task added successfully!' };
  } catch (error) {
    return { success: false, message: error.message, code: error.code };
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
    return { success: true, message: 'Tasks fetched successfully!' };
  } catch (error) {
    return {
      success: false,
      message: `Error getting tasks for user: ${error.message}`,
      code: error.code,
    };
  }
};

export const updateTaskForUser = async (userId, taskId, updatedData) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, updatedData);
    return { success: true, message: 'Task updated successfully!' };
  } catch (error) {
    return {
      success: false,
      message: `Error updating task: ${error.message}`,
      code: error.code,
    };
  }
};

export const deleteTaskForUser = async (userId, taskId) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
    return { success: true, message: 'Task deleted successfully!' };
  } catch (error) {
    return { success: false, message: error.message, code: error.code };
  }
};

export const updateTaskStatus = async (userId, taskId, newStatus) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, { status: newStatus });
    return {
      success: true,
      message: `Task ${taskId} updated to status: ${newStatus}`,
    };
  } catch (error) {
    return { success: false, message: error.message, code: error.code };
  }
};
