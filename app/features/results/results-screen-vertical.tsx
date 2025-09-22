import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { SmallLarge } from '~/components/layouts/small-large';
import { DefaultButton } from '~/components/ui/default-button';
import { QRCodeBanner } from '~/components/ui/qr-code-banner';
import { ProductFilters } from '~/features/results/components/product-filters';
import { ProductFiltersMobile } from '~/features/results/components/product-filters-mobile';
import { ProductTileHorizontalRanked } from '~/features/results/components/product-tile';
import { useFilters } from '~/features/results/hooks/use-filters-hook';
import { useUserFlowExit } from '~/features/user-flow/hooks/use-user-flow-exit';

import { filterProducts } from './utils/filter-products';

const MAIN_URL = 'https://beautechful.com';

interface ResultsScreenVerticalProps {
  analysisResults: { label: string; value: string }[];
  topMatches: {
    image: string;
    brand: string;
    description: string;
    type: string;
    price: string;
    availability: 'available' | 'online' | 'unavailable' | 'unknown';
  }[];
}

export function ResultsScreenVertical({
  topMatches,
}: ResultsScreenVerticalProps) {
  const numberOfProductsToShow = 3;
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const userFlowExitMutation = useUserFlowExit();

  const userId = location.state?.results?.user_id;
  const { filters, setFilters, clearAllFilters, hasActiveFilters } =
    useFilters();

  const filteredMatches = useMemo(
    () => filterProducts(topMatches, filters).slice(0, numberOfProductsToShow),
    [topMatches, filters],
  );

  const pressExitButton = () => {
    const userFlowExit = {
      filters: filters,
      final_recommendations: filteredMatches,
    };

    if (userId) {
      userFlowExitMutation.mutate(
        {
          userId,
          data: userFlowExit,
        },
        {
          onSuccess: () => {
            navigate('/');
          },
          onError: (error) => {
            console.error('Failed to send user flow exit data:', error);
            navigate('/');
          },
        },
      );
    } else {
      console.warn('No user ID available for user flow exit tracking');
      navigate('/');
    }
  };

  return (
    <div className="h-full p-6 bg-background-default flex flex-col gap-4">
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center">
          <Typography
            variant="h3"
            fontWeight={600}
            color="text.primary"
            className="mt-6 sm:pb-8 pb-4"
          >
            {t('results.title')}
          </Typography>

          <div className="hidden sm:flex w-full items-center">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
          <div className="flex sm:hidden w-full flex-row-reverse items-center">
            <ProductFiltersMobile
              filters={filters}
              setFilters={setFilters}
              clearAllFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 flex justify-center">
          <div className="flex flex-col gap-4 pb-4 max-w-3xl mx-auto w-full items-center">
            {filteredMatches.map((match, index) => (
              <ProductTileHorizontalRanked
                key={index}
                image={match.image}
                brand={match.brand}
                description={match.description}
                type={match.type}
                price={match.price}
                availability={match.availability}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        <SmallLarge
          child_large={<QRCodeBanner link={MAIN_URL} />}
          child_small={<div />}
        />

        <div className="flex justify-center mt-4 mb-2 flex-shrink-0">
          <DefaultButton
            text={t('results.exitButton')}
            handleClick={pressExitButton}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsScreenVertical;
