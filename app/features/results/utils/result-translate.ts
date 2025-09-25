import type { RecommendedProduct } from '~/features/results/types';

export interface Match {
  product_id: string;
  image: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  availability: 'available' | 'online' | 'unavailable' | 'unknown';
  gtin: string;
}

export function translateProductsToMatches(
  products: RecommendedProduct[],
): Match[] {
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
      product_id: product.product_id,
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
