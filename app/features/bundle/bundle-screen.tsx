import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SmallLarge } from '~/components/layouts/small-large';
import { QRCodeBanner } from '~/components/ui/qr-code-banner';
import { BundleProduct } from '~/features/bundle/components/bundle-product';
import { MainProduct } from '~/features/bundle/components/main-product';
import type { Product } from '~/features/results/types';
import theme from '~/styles/theme';

const MAIN_URL = 'https://beautechful.com';

export const BundleScreen = ({ product }: { product: Product }) => {
  // const { id } = useParams<{ id: string }>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <>
      <div className="p-6 sm:pt-16 flex flex-col gap-6 w-full max-w-3xl mx-auto overflow-y-scroll">
        <MainProduct product={product} />
        <div className="flex flex-col mt-6 sm:mt-20 gap-1 sm:gap-3">
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            color="text.primary"
            className="mb-1"
            fontWeight={500}
          >
            {t('bundle.title')}
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            color="text.primary"
            className="mb-1"
            fontWeight={400}
          >
            {t('bundle.text')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:pt-2 bg-[#F2F2F2] sm:bg-white p-3 rounded-md">
            <BundleProduct product={product} />
            <BundleProduct product={product} />
            <BundleProduct product={product} />
          </div>
        </div>
      </div>
      <SmallLarge
        child_large={<QRCodeBanner link={MAIN_URL} />}
        child_small={<div />}
      />
    </>
  );
};
