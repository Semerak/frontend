import { useState } from 'react';
import { Navigate } from 'react-router';

import SensorAnalysis from 'app/features/sensor-analysis/sensor-analysis';
import { Welcome } from 'app/features/welcome/welcome';
import { Page } from 'app/types/pages-enum';
import { useAuth } from '~/firebase/auth-provider';

import type { Route } from './+types/home';

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

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  function switchPage(nextPage: Page) {
    setCurrentPage(nextPage);
  }

  if (currentPage === Page.Welcome) {
    return <Welcome handleClick={switchPage} />;
  }

  if (currentPage === Page.SensorAnalysis) {
    return <SensorAnalysis handleClick={switchPage} />;
  }
}
