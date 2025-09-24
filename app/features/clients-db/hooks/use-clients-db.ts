import { useQuery, useMutation } from '@tanstack/react-query';

import { useSnackbar } from '~/context/snackbar-context';

import {
  fetchClientsDb,
  downloadClientsDbCsv,
  type ClientData,
} from '../api/clients-db-api';

export function useClientsDb() {
  return useQuery<ClientData[], Error>({
    queryKey: ['clients-db'],
    queryFn: fetchClientsDb,
    staleTime: 30000, // 30 seconds
    retry: 2,
  });
}

export function useDownloadClientsDbCsv() {
  const { showError } = useSnackbar();

  return useMutation<void, Error>({
    mutationFn: downloadClientsDbCsv,
    onSuccess: () => {
      console.log('CSV download started successfully');
    },
    onError: (error) => {
      showError(`Failed to download CSV: ${error.message}`);
    },
  });
}
