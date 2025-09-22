import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { FilterProps } from '~/features/results/components/product-filters';
import { cn } from '~/utils/cn';

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
    onFilterChange?.({
      others: newValue,
    });
  };

  return (
    <FormControl size="small" className="sm:w-40">
      <Select
        className={filter.length > 0 ? 'has-filters' : ''}
        multiple
        value={filter}
        onChange={handleOthersChange}
        displayEmpty
        renderValue={(selected) => (
          <span
            className={cn('text-[#302f2f]', {
              'text-[#906B4D]': selected.length > 0,
            })}
          >
            {t('results.filters.other')}
          </span>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: '6px',
              backgroundColor: 'white',
              borderRadius: '8px',
              '& .MuiMenu-list': {
                py: 0,
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
