import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { auth } from './firebase';

const isLocalDev = false;

interface AuthContextType {
  user: User | null;
  token: string;
  loading: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  loading: true,
  onLogin: async () => {},
  onLogout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLocalDev) {
      const mockUser = {
        uid: 'local-user',
        email: 'dev@test.com',
      } as User;

      setUser(mockUser);
      setToken('dev-token');
      setLoading(false);
      console.warn('⚠️ Firebase Auth is disabled in local development mode');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setToken(token);
      } else {
        setToken('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    if (isLocalDev) return;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();
    setToken(token);
  };

  const handleLogout = async () => {
    if (isLocalDev) {
      setUser(null);
      setToken('');
      return;
    }
    signOut(auth);
    setUser(null);
    setToken('');
  };

  const value = {
    user,
    token,
    loading,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
