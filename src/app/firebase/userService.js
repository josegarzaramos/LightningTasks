import {
  createDoc,
  getDocData,
  updateDocData,
  deleteDocData,
} from './firestoreService';

export const createUser = async (userId, userData) => {
  await createDoc('users', userId, userData);
};

export const getUser = async (userId) => {
  return await getDocData('users', userId);
};

export const updateUser = async (userId, updatedData) => {
  await updateDocData('users', userId, updatedData);
};

export const deleteUser = async (userId) => {
  await deleteDocData('users', userId);
};
