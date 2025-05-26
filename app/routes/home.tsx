import { useEffect, useState } from 'react';

import SensorAnalysis from 'app/features/sensor-analysis/sensor-analysis';
import { Welcome } from 'app/features/welcome/welcome';
import { Page } from 'app/types/pages-enum';

import { useAuth } from '../firebase/auth-provider';

import type { Route } from './+types/home';
import Config from './config';
import LoginForm from './login';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
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

  if (currentPage === Page.Config) {
    return <Config handleClick={switchPage} />;
  }

  if (currentPage === Page.Welcome) {
    return <Welcome handleClick={switchPage} />;
  }

  if (currentPage === Page.SensorAnalysis) {
    return <SensorAnalysis handleClick={switchPage} />;
  }
}
