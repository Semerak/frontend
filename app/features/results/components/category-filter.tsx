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

export const CategoryFilters = (props: FilterProps) => {
  const { t } = useTranslation();
  const { onFilterChange, filter, setFilter } = props;

  const categoryOptions = [
    t('results.filters.categoryOptions.bb-cream-cc-cream'),
    t('results.filters.categoryOptions.concealer'),
    t('results.filters.categoryOptions.foundation'),
    t('results.filters.categoryOptions.highlighter'),
    t('results.filters.categoryOptions.powder'),
  ];

  const handleCategoryChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setFilter(newValue);
    onFilterChange?.({
      category: newValue,
    });
  };
  return (
    <FormControl size="small" className="sm:w-40">
      <Select
        className={filter.length > 0 ? 'has-filters' : ''}
        multiple
        value={filter}
        onChange={handleCategoryChange}
        displayEmpty
        renderValue={(selected) => (
          <span
            className={cn('text-[#302f2f]', {
              'text-[#906B4D]': selected.length > 0,
            })}
          >
            {t('results.filters.category')}
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
        {categoryOptions.map((option) => (
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
