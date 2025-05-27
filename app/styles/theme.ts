import { createTheme } from '@mui/material/styles';

// Module augmentation for custom palette

declare module '@mui/material/styles' {
  interface Palette {
    availability: {
      available: string;
      online: string;
      unavailable: string;
    };
    border: {
      shadow: string;
    };
  }
  interface PaletteOptions {
    availability?: {
      available: string;
      online: string;
      unavailable: string;
    };
    border?: {
      shadow: string;
    };
  }
}

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
      paper: '#C4C4C4', // Reverted to original value
    },
    text: {
      primary: '#000000',
      secondary: '#6B6B6B',
    },
    availability: {
      available: '#1DBA4A', // green
      online: '#FFA500', // orange
      unavailable: '#FF3B30', // red
    },
    border: {
      shadow: '#E0E0E0',
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
