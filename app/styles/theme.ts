import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#906B4D',
      dark: '#4d3725',
    },
    secondary: {
      main: '#C49E91',
    },
    background: {
      default: '#FFFFFF',
      paper: '#C4C4C4',
    },
    text: {
      primary: '#000000',
      secondary: '',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
