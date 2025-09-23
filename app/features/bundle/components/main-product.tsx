import { Typography, useMediaQuery } from '@mui/material';

import { ProductAvailability } from '~/features/results/components/product-availability';
import type { Product } from '~/features/results/types';
import theme from '~/styles/theme';
import { useTranslation } from 'react-i18next';

export const MainProduct = ({ product }: { product: Product }) => {
  const { image, brand, price, availability, description } = product;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 w-full gap-2">
      <img
        src={image}
        alt={brand}
        className="object-contain sm:h-96 h-50 col-span-1 flex justify-center items-center w-full"
      />
      <div className="flex flex-col text-left col-span-3 py-4 ml-2 sm:py-10 sm:ml-4 sm:gap-10 gap-6">
        <div>
          <Typography
            variant={isMobile ? 'h6' : 'h3'}
            fontWeight={600}
            color="text.primary"
            className="mb-1 line-clamp-2"
          >
            {brand}
          </Typography>
          <ProductAvailability availability={availability} price={price} />
        </div>
        <span className="flex flex-col gap-1 sm:py-3 sm:px-4 px-3 py-1.5 bg-[#6EB77126] rounded-md">
          <p className="text-[#1E1E1E] text-xs sm:text-[16px]">
            {t('bundle.bestMatch')}
          </p>
          <Typography
            variant={isMobile ? 'body2' : 'h6'}
            color="text.primary"
            className="mb-1"
            fontWeight={500}
          >
            {description}
          </Typography>
        </span>
      </div>
    </div>
  );
};
