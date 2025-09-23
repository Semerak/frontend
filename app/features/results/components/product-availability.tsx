import { Typography, useMediaQuery } from '@mui/material';

import AvailabilityLight from '~/components/ui/availability-light';
import type { Availability } from '~/features/results/types';
import { cn } from '~/utils/cn';
import theme from '~/styles/theme';

type ProductAvailabilityProps = {
  availability: Availability;
  price: string;
  position?: 'left' | 'right';
  className?: string;
};

export const ProductAvailability = ({
  availability,
  price,
  position = 'left',
  className,
}: ProductAvailabilityProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div
      className={cn('flex items-center mt-2', {
        'justify-end': position === 'right',
        className,
      })}
    >
      {availability && <AvailabilityLight status={availability} />}
      <Typography
        variant={isMobile ? 'body2' : 'body1'}
        color="text.primary"
        className="ml-2"
      >
        {price}
      </Typography>
    </div>
  );
};
