import { useState, useEffect } from 'react';
import { handleLogin } from '../firebase/authService';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { CgSpinner } from 'react-icons/cg';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    setError(false);
    setIsLoading(true);
    const response = await handleLogin(email, password);
    if (response.status === 200) {
      setIsLoading(false);
      router.push('/');
    } else {
      console.log('Wrong email/password');
      setIsLoading(false);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%] lg:grid-cols-[40%] xl:grid-cols-[30%] 2xl:grid-cols-[20%] p-4 m-auto h-full justify-center items-center">
      <form
        className="flex flex-col bg-white px-8 py-12 h-auto gap-6 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold ml-1 text-zinc-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold ml-1 text-zinc-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right text-xs text-blue mr-1">
            <Link href="/reset-password">Forgot password?</Link>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <button
            type="submit"
            className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white"
          >
            <div className="flex justify-center">
              {loading ? (
                <CgSpinner size={'1.50rem'} className="animate-spin mr-3" />
              ) : (
                'Login'
              )}
            </div>
          </button>
          {error && (
            <span className=" text-red-600 text-sm mt-5 text-center">
              {error}
            </span>
          )}
        </div>
        <div className="flex justify-center text-zinc-600 text-sm">
          <span>Don&apos;t have account?</span>
          <Link href="/sign-up" className="text-blue ml-1">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
