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

export const OthersFilters = (props: FilterProps) => {
  const { t } = useTranslation();
  const { onFilterChange, filter, setFilter } = props;

  const othersOptions = [
    t('results.filters.otherOptions.vegan'),
    t('results.filters.otherOptions.alcohol-free'),
    t('results.filters.otherOptions.natural'),
    t('results.filters.otherOptions.available'),
  ];

  const handleOthersChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setFilter(newValue);
    onFilterChange({
      others: newValue,
    });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        multiple
        value={filter}
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
        {othersOptions.map((option) => (
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
