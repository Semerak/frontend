import { useState } from 'react';

import { Page } from 'app/types/pages-enum';

import { useAuth } from '../firebase/auth-provider';

type LoginFormProps = {
  handleClick: (nextPage: Page) => void;
};

export default function Config({ handleClick }: LoginFormProps) {
  const { onLogout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onLogout();
      handleClick(Page.Login);
    } catch (err: any) {
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Wird abgemeldet...' : 'Logout'}
      </button>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
    </div>
  );
}
