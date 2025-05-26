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
  variant = 'outlined',
  disabled = false,
  ...others
}: RHFChipSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            {chips.map((item) => {
              return (
                <Chip
                  key={item}
                  {...field}
                  disabled={disabled}
                  label={item}
                  variant={variant}
                  onClick={() => console.log('test')}
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
