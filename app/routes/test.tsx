import LoadingScreen from '~/features/loading-screen/loading-screen';

import type { Route } from './+types/home';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function TestPage() {
  return <LoadingScreen />;
}
