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
    <div className="flex flex-col items-center bg-background-paper p-4 rounded-lg shadow-md w-34 h-full">
      <div className="flex justify-center items-center mb-4">
        <img
          src={image}
          alt={brand}
          className="object-contain max-h-32 max-w-full"
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

export function ProductTileHorizontal({
  image,
  brand,
  description,
  type,
  price,
  availability,
}: ProductTileProps) {
  return (
    <div className="flex flex-row items-center bg-white rounded-xl shadow p-4 w-full max-w-2xl min-h-[120px]">
      {/* Image */}
      <div className="flex-shrink-0 flex items-center justify-center w-24 h-28 bg-gray-50 rounded-lg mr-4">
        <img src={image} alt={brand} className="object-contain h-24 w-16" />
      </div>
      {/* Details */}
      <div className="flex flex-1 flex-col justify-between h-full">
        <div>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            className="mb-2"
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
        <div className="flex items-center justify-between mt-4">
          <div />
          <div className="flex items-center">
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
    </div>
  );
}
export function ProductTileHorizontalRanked({
  image,
  brand,
  description,
  type,
  price,
  availability,
  rank,
}: ProductTileProps & { rank: number }) {
  // Helper to get ordinal suffix
  const getOrdinal = (n: number) => {
    if (n === 1) return '1st';
    if (n === 2) return '2nd';
    if (n === 3) return '3rd';
    return `${n}th`;
  };

  return (
    <div className="flex flex-row items-center w-full">
      <div className="w-16 flex-shrink-0 flex justify-center items-center mr-2">
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          className="text-black"
          style={{ minWidth: 40, textAlign: 'center' }}
        >
          {getOrdinal(rank)}
        </Typography>
      </div>
      <ProductTileHorizontal
        image={image}
        brand={brand}
        description={description}
        type={type}
        price={price}
        availability={availability}
      />
    </div>
  );
}

export default ProductTile;
