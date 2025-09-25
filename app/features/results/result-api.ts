import type { Result } from '~/features/results/types';

export async function postResults(payload: any): Promise<Result> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/get_results`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to post results');
  }
  return response.json();
}

export async function getResultsByUserId(userId: string): Promise<Result> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/get_results_by_user_id/${userId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get results');
  }
  return await response.json();
}
