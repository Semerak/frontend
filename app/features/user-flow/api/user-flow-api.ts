export interface UserFlowExitRequest {
  filters: {
    coverage: string[];
    category: string[];
    others: string[];
  };
  final_recommendations: Array<{
    image: string;
    brand: string;
    description: string;
    type: string;
    price: string;
    availability: 'available' | 'online' | 'unavailable' | 'unknown';
  }>;
}

export interface UserFlowExitResponse {
  message: string;
}

export async function userFlowExit(
  userId: string,
  data: UserFlowExitRequest,
): Promise<UserFlowExitResponse> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/user_flow/exit/${userId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to record user flow exit');
  }

  return response.json();
}
