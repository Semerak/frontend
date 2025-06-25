import {
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
  Button,
  Chip,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface FilterState {
  coverage: string[];
  category: string[];
  others: string[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const { t } = useTranslation();
  const [coverageFilter, setCoverageFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [othersFilter, setOthersFilter] = useState<string[]>([]);

  const coverageOptions = [
    t('results.filters.coverageOptions.full'),
    t('results.filters.coverageOptions.medium'),
    t('results.filters.coverageOptions.light'),
  ];
  const categoryOptions = [
    t('results.filters.categoryOptions.bb-cream-cc-cream'),
    t('results.filters.categoryOptions.concealer'),
    t('results.filters.categoryOptions.foundation'),
    t('results.filters.categoryOptions.highlighter'),
    t('results.filters.categoryOptions.powder'),
  ];
  const othersOptions = [
    t('results.filters.otherOptions.vegan'),
    t('results.filters.otherOptions.alcohol-free'),
    t('results.filters.otherOptions.natural'),
    t('results.filters.otherOptions.available'),
  ];

  const handleCoverageChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setCoverageFilter(newValue);
    onFilterChange({
      coverage: newValue,
      category: categoryFilter,
      others: othersFilter,
    });
  };

  const handleCategoryChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setCategoryFilter(newValue);
    onFilterChange({
      coverage: coverageFilter,
      category: newValue,
      others: othersFilter,
    });
  };

  const handleOthersChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setOthersFilter(newValue);
    onFilterChange({
      coverage: coverageFilter,
      category: categoryFilter,
      others: newValue,
    });
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
      {/* Filter Dropdowns */}
      <div className="flex flex-col items-center gap-4 mb-4">
        {/* Filter Dropdowns Row */}
        <div className="flex gap-3 justify-center items-center">
          {' '}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              multiple
              value={coverageFilter}
              onChange={handleCoverageChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <span style={{ color: '#999' }}>
                      {t('results.filters.coverage')}
                    </span>
                  );
                }
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.slice(0, 1).map((value) => (
                      <Chip
                        key={value}
                        label={
                          selected.length > 1
                            ? `${value} +${selected.length - 1}`
                            : value
                        }
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.75rem',
                          backgroundColor: '#906B4D',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>
                );
              }}
              sx={{
                backgroundColor: 'white',
                fontSize: '0.875rem',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                },
              }}
            >
              {coverageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={coverageFilter.indexOf(option) > -1}
                    size="small"
                    sx={{
                      color: '#906B4D',
                      '&.Mui-checked': {
                        color: '#906B4D',
                      },
                    }}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              multiple
              value={categoryFilter}
              onChange={handleCategoryChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <span style={{ color: '#999' }}>
                      {t('results.filters.category')}
                    </span>
                  );
                }
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.slice(0, 1).map((value) => (
                      <Chip
                        key={value}
                        label={
                          selected.length > 1
                            ? `${value} +${selected.length - 1}`
                            : value
                        }
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.75rem',
                          backgroundColor: '#906B4D',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>
                );
              }}
              sx={{
                backgroundColor: 'white',
                fontSize: '0.875rem',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                },
              }}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={categoryFilter.indexOf(option) > -1}
                    size="small"
                    sx={{
                      color: '#906B4D',
                      '&.Mui-checked': {
                        color: '#906B4D',
                      },
                    }}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              multiple
              value={othersFilter}
              onChange={handleOthersChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <span style={{ color: '#999' }}>
                      {t('results.filters.other')}
                    </span>
                  );
                }
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.slice(0, 1).map((value) => (
                      <Chip
                        key={value}
                        label={
                          selected.length > 1
                            ? `${value.split(':')[0]} +${selected.length - 1}`
                            : value.split(':')[0]
                        }
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.75rem',
                          backgroundColor: '#906B4D',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>
                );
              }}
              sx={{
                backgroundColor: 'white',
                fontSize: '0.875rem',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                },
              }}
            >
              {othersOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={othersFilter.indexOf(option) > -1}
                    size="small"
                    sx={{
                      color: '#906B4D',
                      '&.Mui-checked': {
                        color: '#906B4D',
                      },
                    }}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Clear Filters Button - positioned on the side */}
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
      </div>
    </>
  );
}

export default ProductFilters;
