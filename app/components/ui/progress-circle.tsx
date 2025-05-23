import { useTheme } from '@mui/material/styles';

interface ProgressCircleProps {
  state: 'visited' | 'active' | 'not-visited';
}

export function ProgressCircle({ state }: ProgressCircleProps) {
  const theme = useTheme();
  const baseClass = 'w-6 h-6 rounded-full inline-block';
  let style_span = {};
  let stateClass = '';

  if (state === 'visited') {
    // visited
    stateClass = '';
    style_span = { backgroundColor: theme.palette.primary.main };
  } else if (state === 'active') {
    // active
    stateClass = 'border-2';
    style_span = {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    };
  } else {
    // not-visited
    stateClass = '';
    style_span = { backgroundColor: theme.palette.background.paper };
  }

  return <span className={`${baseClass} ${stateClass}`} style={style_span} />;
}
