import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { cn } from '~/utils/cn';

import AvailabilityLight, {
  type AvailabilityStatus,
} from '../../../components/ui/availability-light';

interface ProductTileProps {
  image: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  availability?: AvailabilityStatus;
  rank: number;
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
  rank,
}: ProductTileProps) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        'relative grid grid-cols-6 gap-2 items-center bg-white rounded-xl py-4 px-1 sm:p-4 w-full max-w-3xl outline h-[150px] outline-[#EEEDEC]',
        { ['outline-[#6EB771]']: rank === 1 },
      )}
    >
      <div>
        <span
          className={cn(
            'absolute -top-7 left-2 w-fit bg-[#6EB771] rounded-x-md rounded-t-md py-1 px-2 text-white text-sm',
            {
              hidden: rank !== 1,
            },
          )}
        >
          {t('results.bestMatch')}
        </span>
        <div className="col-span-1">
          <img src={image} alt={brand} className="object-contain h-24 w-16" />
        </div>
      </div>

      <div className="flex flex-col col-span-5 gap-2">
        <div className="flex flex-col gap-1">
          <Typography variant="body1" fontWeight={500} color="text.primary">
            {brand}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            className="line-clamp-2"
          >
            {description}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          className="italic capitalize"
        >
          {type}
        </Typography>

        <span className="flex items-center text-xs">
          {availability && (
            <AvailabilityLight status={availability} className="mr-2" />
          )}
          {price}
        </span>
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
  return (
    <div className="flex flex-row items-center w-full sm:pt-4">
      <ProductTileHorizontal
        image={image}
        brand={brand}
        description={description}
        type={type}
        price={price}
        availability={availability}
        rank={rank}
      />
    </div>
  );
}

export default ProductTile;
