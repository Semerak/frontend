import { useMutation } from '@tanstack/react-query';

import type { Bundle } from '~/features/bundle/types';

export interface GetBundlePayload {
  user_id: string;
  product_id: string;
}

async function getBundle(payload: GetBundlePayload): Promise<Bundle> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/bundle_products`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to get bundle products');
  }
  return await response.json();
}

export function useGetBundle() {
  return useMutation({
    mutationFn: getBundle,
  });
}
