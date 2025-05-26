export interface CielabResponse {
  values: [number, number, number];
  hex_value: string;
}

export async function fetchSensorData(): Promise<CielabResponse> {
  const apiUrl = import.meta.env.VITE_BACKEND_LOCAL_URL;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error('Failed to fetch sensor data');
  return res.json();
}
