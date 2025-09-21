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
import theme from '~/styles/theme';

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
              <span style={{ color: theme.palette.text.primary }}>
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
                    fontSize: '14px',
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
          fontSize: '14px',
          '& .MuiSelect-select': {
            padding: '8px 12px',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: '6px',
              backgroundColor: 'white',
              borderRadius: '8px',
              '& .MuiMenu-list': {
                p: 0,
              },
            },
          },
        }}
      >
        {coverageOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              p: '2px',
            }}
          >
            <Checkbox
              checked={filter.indexOf(option) > -1}
              size="small"
              sx={{
                px: '8px',
                py: '2px',
                color: '#906B4D',
                '&.Mui-checked': {
                  color: '#906B4D',
                },
              }}
            />
            <ListItemText
              primary={option}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '14px',
                },
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
