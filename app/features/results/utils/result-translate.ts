interface Product {
  product_brand_name: string;
  product_description: string;
  product_color_swatch: string;
  type: string;
  price: string;
  product_image: string;
  product_link: string;
  erp_connection: boolean;
  instore_status: boolean;
  online_status: boolean;
  stock_level: number;
  match_percentage: string;
  product_id: string;
  properties: Record<string, string[]>;
}

export interface Match {
  image: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  availability: 'available' | 'online' | 'unavailable' | 'unknown';
  gtin: string;
}

export function translateProductsToMatches(products: Product[]): Match[] {
  return products.map((product) => {
    let availability: 'available' | 'online' | 'unavailable' | 'unknown';

    if (!product.erp_connection) {
      availability = 'unknown';
    } else if (product.instore_status) {
      availability = 'available';
    } else if (product.online_status) {
      availability = 'online';
    } else {
      availability = 'unavailable';
    }

    return {
      image: product.product_image,
      brand: product.product_brand_name,
      description: product.product_description,
      type: product.type,
      price: product.price,
      availability,
      gtin: product.product_id,
    };
  });
}
