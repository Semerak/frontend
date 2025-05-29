import { Typography } from '@mui/material';
import React from 'react';

import AvailabilityLight, {
  type AvailabilityStatus,
} from './availability-light';

interface ProductTileProps {
  image: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  availability?: AvailabilityStatus;
}

export function ProductTile({
  image,
  brand,
  description,
  type,
  price,
  availability,
}: ProductTileProps) {
  return (
    <div className="flex flex-col items-center bg-background-paper p-4 rounded-lg shadow-md w-[200px] h-[300px]">
      <div className="flex justify-center items-center h-[120px] mb-4">
        <img
          src={image}
          alt={brand}
          className="object-contain max-h-[110px] max-w-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            className="leading-tight mb-1 line-clamp-2"
          >
            {brand}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-1">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="italic">
            {type}
          </Typography>
        </div>
        <div className="flex items-center justify-end mt-2">
          {availability && <AvailabilityLight status={availability} />}
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            className="ml-2"
          >
            {price}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ProductTile;
