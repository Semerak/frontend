import { useQuery } from '@tanstack/react-query';

export async function fetchConfig(): Promise<any> {
  const url = `${import.meta.env.VITE_BACKEND_LOCAL_URL}/get_config`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
}

export function useConfigQuery() {
  return useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  });
}
