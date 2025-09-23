import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { cn } from '~/utils/cn';

type MultiSelectFilterProps = {
  filter: string[];
  setFilter: (filter: string) => void;
  labelKey: string;
  optionKeys: string[];
};

export const MultiSelectFilter = ({
  filter,
  setFilter,
  labelKey,
  optionKeys,
}: MultiSelectFilterProps) => {
  const { t } = useTranslation();

  const options = optionKeys.map((key: string) => t(key));

  const handleChange = (event: any) => {
    const value = event.target.value;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setFilter(newValue);
  };

  return (
    <FormControl size="small" className="sm:w-40">
      <Select
        className={filter.length > 0 ? 'has-filters' : ''}
        multiple
        value={filter}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => (
          <span
            className={cn('text-[#302f2f]', {
              'text-[#906B4D]': selected.length > 0,
            })}
          >
            {t(labelKey)}
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
        {options.map((option: string) => (
          <MenuItem key={option} value={option} sx={{ p: '2px' }}>
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
