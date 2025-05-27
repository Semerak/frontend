import type { ChipOwnProps } from '@mui/material';
import { Chip } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface RHFChipSelectProps extends ChipOwnProps {
  name: string;
  chips: string[];
  limit?: number;
}

export function RHFChipSelect({
  name,
  chips,
  disabled = false,
  ...others
}: RHFChipSelectProps) {
  const formContext = useFormContext();
  const { control } = formContext;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            {chips.map((item, idx) => {
              const isSelected = field.value === idx;
              return (
                <Chip
                  key={item}
                  {...field}
                  disabled={disabled}
                  label={item}
                  variant={isSelected ? 'filled' : 'outlined'}
                  onClick={() => {
                    field.onChange(idx);
                  }}
                  {...others}
                />
              );
            })}
          </>
        );
      }}
    />
  );
}
