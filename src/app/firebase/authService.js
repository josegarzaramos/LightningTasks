import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const registerUser = async ({ email, password, name }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email,
      name,
      createdAt: new Date().toISOString(),
    });

    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User logged in:', userCredential.user);
    return {
      status: 200,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      status: 400,
      error: error.message,
    };
  }
};
