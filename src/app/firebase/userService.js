import { createDoc, getDocData, updateDocData } from './firestoreService';

export const createUser = async (userId, userData) => {
  await createDoc('users', userId, userData);
};

export const getUser = async (userId) => {
  return await getDocData('users', userId);
};

export const updateUser = async (userId, updatedData) => {
  await updateDocData('users', userId, updatedData);
};
