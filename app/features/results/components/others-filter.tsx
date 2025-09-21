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
              <span style={{ color: theme.palette.text.primary }}>
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
        {othersOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              px: '2px',
              py: 0,
            }}
          >
            <Checkbox
              checked={filter.indexOf(option) > -1}
              size="small"
              sx={{
                px: '10px',
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
