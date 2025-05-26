import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../firebase/auth-provider';

export default function LogOut() {
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await onLogout();
    } catch (err: any) {
      setError(err.code);
      console.log(err);
    } finally {
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logout...' : 'Logout'}
      </button>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
    </div>
  );
}
