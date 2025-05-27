// ...existing code...

export async function postResults(payload: any): Promise<any> {
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
