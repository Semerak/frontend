import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { FilterProps } from '~/features/results/components/product-filters';

export const CoverageFilters = (props: FilterProps) => {
  const { t } = useTranslation();
  const { onFilterChange, filter, setFilter } = props;

  const coverageOptions = [
    t('results.filters.coverageOptions.full'),
    t('results.filters.coverageOptions.medium'),
    t('results.filters.coverageOptions.light'),
  ];

  const handleCoverageChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setFilter(newValue);
    onFilterChange({
      coverage: newValue,
    });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        multiple
        value={filter}
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
          borderRadius: '12px',
          backgroundColor: 'white',
          fontSize: '0.875rem',
          '& .MuiSelect-select': {
            padding: '8px 12px',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: 'white',
            },
          },
        }}
      >
        {coverageOptions.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              checked={filter.indexOf(option) > -1}
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
  );
};
