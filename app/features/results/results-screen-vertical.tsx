import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductFilters } from '~/features/results/components/product-filters';
import { ProductFiltersMobile } from '~/features/results/components/product-filters-mobile';
import { ProductTileHorizontalRanked } from '~/features/results/components/product-tile';
import { useFilters } from '~/features/results/hooks/use-filters-hook';

import { filterProducts } from './utils/filter-products';

interface ResultsScreenVerticalProps {
  analysisResults: { label: string; value: string }[];
  topMatches: {
    image: string;
    brand: string;
    description: string;
    type: string;
    price: string;
    availability: 'available' | 'online' | 'unavailable' | 'unknown';
  }[];
}

export function ResultsScreenVertical({
  topMatches,
}: ResultsScreenVerticalProps) {
  const { t } = useTranslation();

  const { filters, setFilters, clearAllFilters, hasActiveFilters } =
    useFilters();

  const filteredMatches = useMemo(
    () => filterProducts(topMatches, filters),
    [topMatches, filters],
  );

  return (
    <div className="h-full p-6 bg-background-default flex flex-col gap-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center">
          <Typography
            variant="h3"
            fontWeight={600}
            color="text.primary"
            className="mt-6 sm:pb-8 pb-4"
          >
            {t('results.title')}
          </Typography>

          <div className="hidden sm:flex w-full items-center">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
          <div className="flex sm:hidden w-full flex-row-reverse items-center">
            <ProductFiltersMobile
              filters={filters}
              setFilters={setFilters}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 flex justify-center">
          <div className="flex flex-col gap-4 pb-4 max-w-3xl mx-auto w-full items-center">
            {filteredMatches.slice(0, 3).map((match, index) => (
              <ProductTileHorizontalRanked
                key={index}
                image={match.image}
                brand={match.brand}
                description={match.description}
                type={match.type}
                price={match.price}
                availability={match.availability}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsScreenVertical;
