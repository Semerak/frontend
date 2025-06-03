export async function fetchQuestions(): Promise<any> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/questions`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
}
