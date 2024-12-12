import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';

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

    return user;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};

export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};

export const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent.' };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};

export const sendResetLink = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: 'https://lightning-tasks.vercel.app/',
    });
    return { success: true, message: 'Password reset email sent.' };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};

export const handlePasswordReset = async (oobCode, newPassword) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);

    await confirmPasswordReset(auth, oobCode, newPassword);

    return {
      success: true,
      message: 'Password reset successful.',
      email,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
    return { success: true, message: 'User logged out.' };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: error.code,
    };
  }
};
