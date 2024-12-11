import { useState } from 'react';

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

  const borderColor = error ? 'border-red-500' : 'border-gray';

  return (
    <div>
      <form className="flex flex-col h-auto gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold ml-1 text-zinc-600">
            New password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`border ${borderColor} rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue cursor-pointer`}
            placeholder="Confirm password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold ml-1 text-zinc-600">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className={`border ${borderColor} rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue`}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white"
        >
          Reset password
        </button>
        {newPasswordError != '' && (
          <span className="text-sm text-red-600 text-center">
            {newPasswordError}
          </span>
        )}
      </form>
    </div>
  );
};
export default NewPassword;
