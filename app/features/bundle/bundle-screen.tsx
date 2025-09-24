import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SmallLarge } from '~/components/layouts/small-large';
import { QRCodeBanner } from '~/components/ui/qr-code-banner';
import { BundleProduct } from '~/features/bundle/components/bundle-product';
import { MainProduct } from '~/features/bundle/components/main-product';
import type { Bundle } from '~/features/bundle/types';
import theme from '~/styles/theme';

const MAIN_URL = 'https://beautechful.com';

export const BundleScreen = ({ bundle }: { bundle: Bundle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <>
      <div className="p-6 sm:pt-16 flex flex-col gap-6 w-full max-w-3xl mx-auto overflow-y-scroll">
        <MainProduct product={bundle.main_product} />
        <div className="flex flex-col mt-2 sm:mt-16 gap-1 sm:gap-3">
          <Typography
            variant={'h3'}
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

          <div className="sm:hidden gap-2 w-full rounded-md mt-8 grid grid-cols-2">
            {bundle.bundle.map((p, i) => (
              <BundleProduct product={p} key={`${p.product_id}-${i}`} />
            ))}
          </div>

          <Box className="w-full mt-8 hidden sm:flex">
            <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide p-3 sm:pt-2">
              {bundle.bundle.map((p, i) => (
                <BundleProduct key={`${p.product_id}-${i}`} product={p} />
              ))}
            </div>
          </Box>
        </div>
      </div>
      <SmallLarge
        child_large={<QRCodeBanner link={MAIN_URL} />}
        child_small={<div />}
      />
    </>
  );
};
