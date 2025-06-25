import type { FilterState } from '~/components/ui/product-filters';
import type { Match } from '~/features/results/utils/result-translate';

export function filterProducts(
  products: Match[],
  filters: FilterState,
): Match[] {
  return products.filter((product) => {
    // Filter by product type (category)
    if (filters.category.length > 0) {
      const productTypeLower = product.type.toLowerCase();
      const hasMatchingCategory = filters.category.some((category) =>
        productTypeLower.includes(category.toLowerCase()),
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // Filter by "available" option in Others tab only
    if (
      filters.others.includes('Available') ||
      filters.others.includes('Verfügbar')
    ) {
      if (product.availability !== 'available') {
        return false;
      }
    }

    // Add more filter logic here for coverage and other product properties
    // Coverage filtering would need product properties or additional data
    // Other filtering (Vegan, Alcohol-free, etc.) would need product properties

    return true;
  });
}
