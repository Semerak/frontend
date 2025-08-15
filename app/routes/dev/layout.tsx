import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';

export function meta() {
  return [
    { title: 'Developer Tools - Makeup Match' },
    { name: 'description', content: 'Developer tools for product management' },
  ];
}

interface SystemStatus {
  firestore_available: boolean;
  foundation_matching_service: string;
  supported_stores: string[];
  firestore_connection?: string;
  firestore_error?: string;
}

export default function DevLayout() {
  const location = useLocation();
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_CLOUD_URL}/system/status`);
      const data = await response.json();
      setSystemStatus(data);
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🛠️ Developer Tools
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ ml: 2 }}
          >
            ← Back to App
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {!loading && systemStatus && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Alert 
                severity={systemStatus.firestore_available ? 'success' : 'warning'}
                variant="outlined"
                sx={{ flex: 1, minWidth: 200 }}
              >
                Firestore: {systemStatus.firestore_available ? 'Connected' : 'Offline'}
              </Alert>
              <Alert 
                severity="info"
                variant="outlined"
                sx={{ flex: 1, minWidth: 200 }}
              >
                Foundation Service: {systemStatus.foundation_matching_service}
              </Alert>
              <Alert 
                severity="info"
                variant="outlined"
                sx={{ flex: 1, minWidth: 200 }}
              >
                Stores: {systemStatus.supported_stores.join(', ')}
              </Alert>
            </Box>
            {systemStatus.firestore_error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {systemStatus.firestore_error}
              </Alert>
            )}
          </Paper>
        )}

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={isActivePath('/dev') ? 'contained' : 'outlined'}
              component={Link}
              to="/dev"
              startIcon="🏠"
            >
              Home
            </Button>
            <Button
              variant={isActivePath('/dev/product-scanner') ? 'contained' : 'outlined'}
              component={Link}
              to="/dev/product-scanner"
              startIcon="📦"
            >
              Product Scanner
            </Button>
            <Button
              variant={isActivePath('/dev/system-status') ? 'contained' : 'outlined'}
              component={Link}
              to="/dev/system-status"
              startIcon="⚙️"
            >
              System Status
            </Button>
          </Box>
        </Paper>

        <Outlet />
      </Container>
    </Box>
  );
}
