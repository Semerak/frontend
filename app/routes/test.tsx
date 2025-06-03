import { Button } from '@mui/material';

import { useSnackbar } from '~/context/snackbar-context';

import type { Route } from './+types/test';

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button variant="contained" color="primary" onClick={onClick}>
        Click Me
      </Button>
    </div>
  );
}
