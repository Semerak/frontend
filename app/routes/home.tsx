import { useState } from 'react';

import SensorAnalysis from 'app/features/sensor-analysis/sensor-analysis';
import { Welcome } from 'app/features/welcome/welcome';
import { Page } from 'app/types/pages-enum';

import type { Route } from './+types/home';

// eslint-disable-next-line
export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Welcome);

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
