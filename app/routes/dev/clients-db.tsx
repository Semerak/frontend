import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import {
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import { useState } from 'react';

import { ClientsDataTable } from '~/features/clients-db/components/clients-data-table';
import {
  useClientsDb,
  useDownloadClientsDbCsv,
} from '~/features/clients-db/hooks/use-clients-db';

export function meta() {
  return [
    { title: 'Clients Database - Makeup Match' },
    {
      name: 'description',
      content: 'View and analyze client data from the database',
    },
  ];
}

export default function ClientsDbPage() {
  const { data: clientsData, isLoading, error, refetch } = useClientsDb();
  const downloadCsvMutation = useDownloadClientsDbCsv();

  const handleRefresh = () => {
    refetch();
  };

  const handleDownloadCsv = () => {
    downloadCsvMutation.mutate();
  };

  const stats = clientsData
    ? {
        totalClients: clientsData.length,
        withExitTimestamp: clientsData.filter(
          (client) => client['user_flow.exit_timestamp'],
        ).length,
        withRecommendations: clientsData.filter(
          (client) =>
            client['recommendation_focus.final_recommendations']?.length > 0,
        ).length,
        uniqueBrowsers: new Set(
          clientsData
            .map((client) => client['user_flow.browser_name'])
            .filter(Boolean),
        ).size,
        uniqueRetailers: new Set(
          clientsData
            .map((client) => client['user_flow.retailer'])
            .filter(Boolean),
        ).size,
      }
    : null;

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Clients Database
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View, filter, and analyze client interaction data
        </Typography>
      </Box>

      {/* Action Bar */}
      <Box mb={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCsv}
            disabled={downloadCsvMutation.isPending || isLoading}
          >
            Download CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            Refresh Data
          </Button>
          {isLoading && <LinearProgress sx={{ width: 200 }} />}
        </Stack>
      </Box>

      {/* Stats Cards */}
      {stats && (
        <Box mb={3}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Card variant="outlined" sx={{ minWidth: 200 }}>
              <CardContent sx={{ pb: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <StorageIcon color="primary" />
                  <Typography variant="h6" component="div">
                    {stats.totalClients.toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Clients
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ minWidth: 200 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" component="div" color="success.main">
                  {stats.withExitTimestamp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Sessions
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ minWidth: 200 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" component="div" color="info.main">
                  {stats.withRecommendations}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  With Recommendations
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ minWidth: 200 }}>
              <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" component="div">
                    {stats.uniqueBrowsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    browsers
                  </Typography>
                  <Typography variant="h6" component="div">
                    {stats.uniqueRetailers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    retailers
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Unique Values
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load clients data: {error.message}
        </Alert>
      )}

      {/* Data Table */}
      <Paper>
        {clientsData && (
          <ClientsDataTable data={clientsData} loading={isLoading} />
        )}
      </Paper>

      {/* Empty State */}
      {!isLoading && !error && clientsData?.length === 0 && (
        <Box display="flex" flexDirection="column" alignItems="center" py={8}>
          <StorageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No client data available
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Client data will appear here once users start interacting with the
            system
          </Typography>
          <Button variant="outlined" onClick={handleRefresh}>
            Check Again
          </Button>
        </Box>
      )}

      {/* Footer Info */}
      <Box mt={4} p={2} bgcolor="grey.50" borderRadius={1}>
        <Typography variant="body2" color="text.secondary">
          <strong>Data Source:</strong> This data is fetched from the{' '}
          <code>/clients_db</code> API endpoint. Data includes client features,
          user flow tracking, and recommendation focus information.
        </Typography>
      </Box>
    </Box>
  );
}
