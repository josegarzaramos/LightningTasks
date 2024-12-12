import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../firebase/authService';
import { useAuthContext } from '../context/AuthContext';
import { CgSpinner } from 'react-icons/cg';
import TextInput from './UI/TextInput';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
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
    setIsLoading(true);
    const response = await registerUser({ email, password, name });
    if (response) {
      setIsLoading(false);
      setError('');
      router.push('/');
    } else {
      setError('There was an error, try again.');
      setIsLoading(false);
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
            Name
          </label>
          <TextInput
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={1}
            required
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold ml-1 text-zinc-600">
            Password
          </label>
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
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
                'Sign up'
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
          <span>Already have account?</span>
          <Link href="/login" className="text-blue ml-1">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
