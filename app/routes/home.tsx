import { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthProvider';
import SensorAnalysis from '~/sensor_analysis/sensor_analysis';
import type { Route } from './+types/home';
import LoginForm from './login';
import { Welcome } from '~/welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export enum Page {
  Login = 'Login',
  Welcome = 'Welcome',
  SensorAnalysis = 'SensorAnalysis',
}

export default function Home() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(Page.Welcome);

  function switchPage(nextPage: Page) {
    setCurrentPage(nextPage);
  }

  useEffect(() => {
    if (!loading && !user) {
      setCurrentPage(Page.Login);
    }
  }, [user, loading]);

  if (currentPage === Page.Login) {
    return <LoginForm handleClick={switchPage} />;
  }

  if (currentPage === Page.Welcome) {
    return <Welcome handleClick={switchPage} />;
  }

  if (currentPage === Page.SensorAnalysis) {
    return <SensorAnalysis handleClick={switchPage} />;
  }
}
