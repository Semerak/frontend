import { useMutation } from '@tanstack/react-query';

import { useSnackbar } from '~/context/snackbar-context';

import {
  userFlowExit,
  type UserFlowExitRequest,
  type UserFlowExitResponse,
} from '../api/user-flow-api';

export function useUserFlowExit() {
  const { showError } = useSnackbar();

  return useMutation<
    UserFlowExitResponse,
    Error,
    { userId: string; data: UserFlowExitRequest }
  >({
    mutationFn: ({ userId, data }) => userFlowExit(userId, data),
    onError: (error) => {
      showError(`Failed to record user flow exit: ${error.message}`);
    },
  });
}
