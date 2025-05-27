import { useMutation } from '@tanstack/react-query';

import { postResults } from '../result-api';

export function useGetResults() {
  return useMutation({
    mutationFn: postResults,
  });
}
