import { useMutation } from '@tanstack/react-query';

import { getResultsByUserId, postResults } from '../result-api';

export function usePostResults() {
  return useMutation({
    mutationFn: postResults,
  });
}

export function useGetResultsByUserId() {
  return useMutation({
    mutationFn: getResultsByUserId,
  });
}
