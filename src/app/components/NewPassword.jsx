import { useState } from 'react';
import TextInput from './UI/TextInput';

const NewPassword = ({ onSubmit, newPasswordError }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      setError('');
      onSubmit(password);
    } else {
      setError('The passwords do not match.');
    }
  };

  return (
    <div>
      <form className="flex flex-col h-auto gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold ml-1 text-zinc-600">
            New password
          </label>
          <TextInput
            type="password"
            id="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            error={error}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirm-password"
            className="font-bold ml-1 text-zinc-600"
          >
            Confirm password
          </label>
          <TextInput
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            error={error}
          />
        </div>

        <button
          type="submit"
          className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white"
        >
          Reset password
        </button>

        {newPasswordError && (
          <span className="text-sm text-red-600 text-center">
            {newPasswordError}
          </span>
        )}

        {error && (
          <span className="text-sm text-red-600 text-center">{error}</span>
        )}
      </form>
    </div>
  );
};

export default NewPassword;
