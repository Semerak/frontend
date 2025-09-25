import type { Result } from '~/features/results/types';

const LOCAL_STORAGE_KEY_PREFIX = 'results_';

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

export async function getResultsByUserId(userId?: string): Promise<Result> {
  const storageKey = LOCAL_STORAGE_KEY_PREFIX + userId;
  const cached = localStorage.getItem(storageKey);

  if (cached) {
    return JSON.parse(cached);
  }

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
  const data = await response.json();

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    console.error('Failed cache results on localStorage');
  }

  return data;
}
