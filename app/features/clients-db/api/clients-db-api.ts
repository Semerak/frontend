export interface ClientData {
  client_id: string;
  'features.colors_lab.1.L': number;
  'features.colors_lab.1.a': number;
  'features.colors_lab.1.b': number;
  'features.colors_lab.2.L': number;
  'features.colors_lab.2.a': number;
  'features.colors_lab.2.b': number;
  'features.colors_lab.3.L': number;
  'features.colors_lab.3.a': number;
  'features.colors_lab.3.b': number;
  'features.colors_hex.1': string;
  'features.colors_hex.2': string;
  'features.colors_hex.3': string;
  'features.color_avg_lab.L': number;
  'features.color_avg_lab.a': number;
  'features.color_avg_lab.b': number;
  'features.color_avg_hex': string;
  'user_flow.browser_name': string;
  'user_flow.retailer': string;
  'user_flow.store_location': string;
  'user_flow.clarity_id': string;
  'user_flow.result_page_timestamp': string;
  'user_flow.phone_page_results_timestamp': string;
  'user_flow.exit_timestamp': string;
  'recommendation_focus.filters': {
    coverage: string[];
    category: string[];
    others: string[];
  };
  'recommendation_focus.final_recommendations': Array<{
    description: string;
    image: string;
    type: string;
    price: string;
    availability: string;
    gtin: string;
    brand: string;
  }>;
  [key: string]: any; // For additional dynamic fields
}

export async function fetchClientsDb(): Promise<ClientData[]> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/clients_db`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch clients database: ${response.statusText}`);
  }

  return response.json();
}

export async function downloadClientsDbCsv(): Promise<void> {
  const url = `${import.meta.env.VITE_BACKEND_CLOUD_URL}/download_clients_db`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.statusText}`);
  }

  // Create blob and download
  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'clients_summary.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
