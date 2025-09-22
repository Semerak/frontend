import { Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { MultiSelectFilter } from '~/features/results/components/multi-select-filter';
import { FILTER_CONFIG } from '~/features/results/config/filter-config';
import type { FilterState } from '~/features/results/hooks/use-filters-hook';

export type ProductFiltersProps = {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
};

export function ProductFilters({
  filters,
  setFilters,
  clearAllFilters,
  hasActiveFilters,
}: ProductFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-4">
      <div className="flex gap-3 items-center">
        {Object.entries(FILTER_CONFIG).map(([key, config]) => (
          <MultiSelectFilter
            key={key}
            filter={filters[key as keyof FilterState]}
            setFilter={(value: string) =>
              setFilters((prev) => ({ ...prev, [key]: value }))
            }
            labelKey={config.labelKey}
            optionKeys={config.optionKeys}
          />
        ))}
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
  );
}
