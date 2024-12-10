import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const handleSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User signed up:', userCredential.user);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};

async function handleLogin(email, password) {
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
}

export { handleSignup, handleLogin };
