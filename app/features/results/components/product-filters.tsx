import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CoverageFilters } from '~/features/results/components/coverage-filters';
import { CategoryFilters } from '~/features/results/components/category-filter';
import { OthersFilters } from './others-filter';

export interface FilterState {
  coverage?: string[];
  category?: string[];
  others?: string[];
}

type ProductFiltersProps = {
  onFilterChange: (filters: Partial<FilterState>) => void;
};

export type FilterProps = {
  filter: string[];
  setFilter: (filter: string[]) => void;
} & ProductFiltersProps;

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const { t } = useTranslation();
  const [coverageFilter, setCoverageFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [othersFilter, setOthersFilter] = useState<string[]>([]);

  const clearAllFilters = () => {
    setCoverageFilter([]);
    setCategoryFilter([]);
    setOthersFilter([]);
    onFilterChange({
      coverage: [],
      category: [],
      others: [],
    });
  };

  const hasActiveFilters =
    coverageFilter.length > 0 ||
    categoryFilter.length > 0 ||
    othersFilter.length > 0;
  return (
    <>
      {/* Filters & Clear Button Row */}
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
        {/* Left Filters */}
        <div className="flex gap-3 mb-4">
          <CoverageFilters
            filter={coverageFilter}
            setFilter={setCoverageFilter}
            onFilterChange={onFilterChange}
          />
          <CategoryFilters
            filter={categoryFilter}
            setFilter={setCategoryFilter}
            onFilterChange={onFilterChange}
          />
          <OthersFilters
            filter={othersFilter}
            setFilter={setOthersFilter}
            onFilterChange={onFilterChange}
          />
        </div>

        {/* Right Clear Button */}
        {hasActiveFilters && (
          <Button
            variant="outlined"
            size="small"
            onClick={clearAllFilters}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: '#906B4D',
              borderColor: '#906B4D',
              marginLeft: 2,
              '&:hover': {
                borderColor: '#4d3725',
                backgroundColor: 'rgba(144, 107, 77, 0.04)',
              },
            }}
          >
            {t('results.filters.clear')}
          </Button>
        )}
      </div>
    </>

  );
}

export default ProductFilters;
