import { Typography } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type FilterState,
  ProductFilters,
} from '~/features/results/components/product-filters';
import ProductFiltersMobile from '~/features/results/components/product-filters-mobile';
import { ProductTileHorizontalRanked } from '~/features/results/components/product-tile';
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
  const [coverageFilter, setCoverageFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [othersFilter, setOthersFilter] = useState<string[]>([]);

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    coverage: [],
    category: [],
    others: [],
  });

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const filteredMatches = useMemo(
    () => filterProducts(topMatches, activeFilters),
    [topMatches, activeFilters],
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
              onFilterChange={handleFilterChange}
              coverageFilter={coverageFilter}
              othersFilter={othersFilter}
              setCategoryFilter={setCategoryFilter}
              categoryFilter={categoryFilter}
              setCoverageFilter={setCoverageFilter}
              setOthersFilter={setOthersFilter}
            />
          </div>
          <div className="flex sm:hidden w-full flex-row-reverse items-center">
            <ProductFiltersMobile
              onFilterChange={handleFilterChange}
              coverageFilter={coverageFilter}
              othersFilter={othersFilter}
              setCategoryFilter={setCategoryFilter}
              categoryFilter={categoryFilter}
              setCoverageFilter={setCoverageFilter}
              setOthersFilter={setOthersFilter}
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
