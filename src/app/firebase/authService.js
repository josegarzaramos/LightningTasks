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

export const resetUserPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully to:', email);
    return { success: true, message: 'Password reset email sent.' };
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    throw { success: false, message: error.message };
  }
};

export const sendResetLink = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: 'https://lightning-tasks.vercel.app/',
    });
    console.log('Password reset email sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    throw error;
  }
};

export const handlePasswordReset = async (oobCode, newPassword) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    console.log(`Reset code is valid for email: ${email}`);

    await confirmPasswordReset(auth, oobCode, newPassword);
    console.log('Password has been reset successfully.');

    return { success: true, message: 'Password reset successful.' };
  } catch (error) {
    debugger;
    console.error('Error resetting password:', error);
    return { success: false, message: error.message, code: error.code };
  }
};
