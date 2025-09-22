import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CategoryFilters } from '~/features/results/components/category-filter';
import { CoverageFilters } from '~/features/results/components/coverage-filters';
import { OthersFilters } from '~/features/results/components/others-filter';

export interface FilterState {
  coverage?: string[];
  category?: string[];
  others?: string[];
}

type ProductFiltersProps = {
  onFilterChange: (filters: Partial<FilterState>) => void;
  coverageFilter: string[];
  setCoverageFilter: (filters: string[]) => void;
  categoryFilter: string[];
  setCategoryFilter: (filters: string[]) => void;
  othersFilter: string[];
  setOthersFilter: (filters: string[]) => void;
};

export type FilterProps = {
  filter: string[];
  setFilter: (filter: string[]) => void;
  onFilterChange?: (filters: Partial<FilterState>) => void;
};

export function ProductFilters({
  onFilterChange,
  coverageFilter,
  setCoverageFilter,
  setCategoryFilter,
  setOthersFilter,
  othersFilter,
  categoryFilter,
}: ProductFiltersProps) {
  const { t } = useTranslation();

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
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-4 ">
        <div className="flex gap-3 items-center">
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
