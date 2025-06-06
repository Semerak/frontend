import { Button } from '@mui/material';

import { useSnackbar } from '~/context/snackbar-context';

import type { Route } from './+types/test';
import NixQuickTest from '~/components/NixQuickTest';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Makeup Match' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function TestPage() {
  const { showError } = useSnackbar();

  const onClick = () => {
    showError('This is a test error message!');
  };
  return (
    <div>
      <NixQuickTest />
    </div>
  );
}
