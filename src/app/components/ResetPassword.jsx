import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendResetLink, handlePasswordReset } from '../firebase/authService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NewPassword from './NewPassword';
import Confirmation from './UI/Confirmation';
import TextInput from './UI/TextInput';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');

    if (mode === 'resetPassword') {
      setMode(mode);
      setOobCode(oobCode);
    }
    setLoading(false);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetLink(email);
    setEmailSent(true);
  };

  const handleNewPassword = async (newPassword) => {
    const response = await handlePasswordReset(oobCode, newPassword);
    if (response.success) {
      console.log('Password had been updated');
      setIsPasswordUpdated(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      if (response.code === 'auth/invalid-action-code') {
        setNewPasswordError('Invalid or expired verification code');
      } else {
        setNewPasswordError('Something went wrong.');
      }
    }
  };

  if (loading) {
    return null;
  }

  const componentToDisplay = () => {
    if (mode && !isPasswordUpdated) {
      return (
        <NewPassword
          onSubmit={handleNewPassword}
          newPasswordError={newPasswordError}
        />
      );
    }

    if (emailSent && !isPasswordUpdated) {
      return (
        <Confirmation
          title="Check Your Email"
          subtitle="If an account is associated with this email address, instructions to reset your password have been sent."
          description="Please check your inbox (and spam folder) to proceed."
        />
      );
    }

    if (isPasswordUpdated) {
      return (
        <Confirmation
          title="Your password has been updated"
          subtitle="You will be redirected in a moment"
          description="Please login with your new password."
        />
      );
    }

    return (
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold ml-1 text-zinc-600">
            Email
          </label>
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white cursor-pointer"
        >
          Reset password
        </button>
        <div className="flex justify-center text-zinc-600 text-sm">
          <span>Already have an account?</span>
          <Link href="/login" className="text-blue ml-1">
            Login
          </Link>
        </div>
      </form>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%] lg:grid-cols-[40%] xl:grid-cols-[30%] 2xl:grid-cols-[20%] p-4 m-auto h-full justify-center items-center">
      <div className="bg-white px-8 py-12 h-auto rounded-lg">
        {componentToDisplay()}
      </div>
    </div>
  );
};

export default ResetPassword;
