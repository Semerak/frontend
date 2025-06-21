import ColorScannerExample from '~/components/color-scanner-example';
import { ColorSensorProvider } from '~/context/color-sensor';
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
    <div>
      {/* <NixQuickTest /> */}
      <ColorSensorProvider>
        <ColorScannerExample />
      </ColorSensorProvider>
    </div>
  );
}
