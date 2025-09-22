import { Button, Box, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryFilters } from '~/features/results/components/category-filter';
import { CoverageFilters } from '~/features/results/components/coverage-filters';
import { OthersFilters } from '~/features/results/components/others-filter';

export interface FilterState {
  coverage: string[];
  category: string[];
  others: string[];
}

interface ProductFiltersMobileProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
  coverageFilter: string[];
  setCoverageFilter: (filters: string[]) => void;
  categoryFilter: string[];
  setCategoryFilter: (filters: string[]) => void;
  othersFilter: string[];
  setOthersFilter: (filters: string[]) => void;
}

export function ProductFiltersMobile({
  onFilterChange,
  coverageFilter,
  setCoverageFilter,
  setCategoryFilter,
  setOthersFilter,
  othersFilter,
  categoryFilter,
}: ProductFiltersMobileProps) {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

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

  const onApplyFilterClick = () => {
    setDrawerOpen(false);
    onFilterChange({
      coverage: coverageFilter,
      category: categoryFilter,
      others: othersFilter,
    });
  };

  const hasActiveFilters =
    coverageFilter.length > 0 ||
    categoryFilter.length > 0 ||
    othersFilter.length > 0;
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={toggleDrawer(true)}
        sx={{
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#906B4D',
          borderColor: '#906B4D',
        }}
      >
        {t('results.filters.title')}
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: 300,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'white',
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 4 }}>
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>
              {t('results.filters.title')}
            </span>
          </Box>

          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <CoverageFilters
              filter={coverageFilter}
              setFilter={setCoverageFilter}
            />
            <CategoryFilters
              filter={categoryFilter}
              setFilter={setCategoryFilter}
            />
            <OthersFilters filter={othersFilter} setFilter={setOthersFilter} />
          </Box>

          <Box className="flex flex-col gap-3">
            {hasActiveFilters && (
              <Button
                fullWidth
                variant="outlined"
                onClick={clearAllFilters}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#4d3725' },
                }}
              >
                {t('results.filters.clear')}
              </Button>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={onApplyFilterClick}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#906B4D',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#4d3725' },
              }}
            >
              {t('results.filters.applyButton')}
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default ProductFiltersMobile;
