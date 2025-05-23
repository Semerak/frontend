export interface CielabResponse {
  values: [number, number, number];
  hex_value: string;
}

export async function fetchSensorData(): Promise<CielabResponse> {
  const res = await fetch('http://localhost:8008/get_cielab');
  if (!res.ok) throw new Error('Failed to fetch sensor data');
  return res.json();
}
