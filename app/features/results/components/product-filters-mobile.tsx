import { Button, Box, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoverageFilters } from '~/features/results/components/coverage-filters';
import { CategoryFilters } from '~/features/results/components/category-filter';
import { OthersFilters } from '~/features/results/components/others-filter';

export interface FilterState {
  coverage: string[];
  category: string[];
  others: string[];
}

interface ProductFiltersMobileProps {
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export function ProductFiltersMobile({
  onFilterChange,
}: ProductFiltersMobileProps) {
  const { t } = useTranslation();
  const [coverageFilter, setCoverageFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [othersFilter, setOthersFilter] = useState<string[]>([]);

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
          marginBottom: '12px',
          textTransform: 'none',
          fontSize: '0.875rem',
          color: '#906B4D',
          borderColor: '#906B4D',
          '&:hover': {
            borderColor: '#4d3725',
            backgroundColor: 'rgba(144, 107, 77, 0.04)',
          },
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
            width: 300, // adjust drawer width
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'white',
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 4 }}>
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>
              {t('results.filters.title')}
            </span>
          </Box>

          {/* Filters Section */}
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {/* Coverage */}
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
          </Box>

          {/* Footer Apply Button */}
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
              onClick={toggleDrawer(false)}
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
