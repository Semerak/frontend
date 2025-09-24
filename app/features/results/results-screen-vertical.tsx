import { Typography } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { SmallLarge } from '~/components/layouts/small-large';
import { DefaultButton } from '~/components/ui/default-button';
import { NavButton } from '~/components/ui/nav-button';
import ProductFilters, {
  type FilterState,
} from '~/components/ui/product-filters';
import { QRCodeBanner } from '~/components/ui/qr-code-banner';
import { TypographyMultiSize } from '~/components/ui/typograthy-multi-size';
import { useUserFlowExit } from '~/features/user-flow/hooks/use-user-flow-exit';

import { ProductTileHorizontalRanked } from '../../components/ui/product-tile';

import { filterProducts } from './utils/filter-products';

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

export function ResultsScreenVerticalRef({
  analysisResults,
}: ResultsScreenVerticalProps) {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-background-default flex flex-col gap-6 ">
      {/* Analysis Results Section */}
      <div>
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          className="mb-4"
        >
          Your analysis results
        </Typography>
        <div className="flex gap-4">
          {analysisResults.map((result, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-background-paper p-4 rounded-lg shadow-sm"
            >
              <Typography variant="body1" fontWeight={500} color="text.primary">
                {result.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="italic"
              >
                {result.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Top Matches Section */}
      <div>
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          className="mb-4"
        >
          {t('results.title')}
        </Typography>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto flex flex-col justify-start">
            {/* Sample product tiles would go here */}
          </div>

          <footer className="flex justify-center pt-4 pb-8 z-10">
            {/* Send Results Button */}
            <div className="flex justify-center mt-6">
              <NavButton text="Exit the analysis" url="/" />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export function ResultsScreenVertical({
  topMatches,
}: ResultsScreenVerticalProps) {
  const numberOfProductsToShow = 3;
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const userFlowExitMutation = useUserFlowExit();

  // Get user_id from location state (passed from previous screen)
  const userId = location.state?.results?.user_id;

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    coverage: [],
    category: [],
    others: [],
  });

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
    console.log('Active filters:', filters);
  };

  // Filter the products based on active filters
  const filteredMatches = useMemo(
    () =>
      filterProducts(topMatches, activeFilters).slice(
        0,
        numberOfProductsToShow,
      ),
    [topMatches, activeFilters],
  );

  function PressExitButton() {
    console.log('Exit button pressed');
    const userFlowExit = {
      filters: activeFilters,
      final_recommendations: filteredMatches,
    };
    console.log('User Flow Exit Data:', userFlowExit);

    // Send user flow exit data to backend if we have a user ID
    if (userId) {
      console.log('Sending user flow exit data for user ID:', userId);
      userFlowExitMutation.mutate(
        {
          userId,
          data: userFlowExit,
        },
        {
          onSuccess: () => {
            console.log('User flow exit data sent successfully');
            // Navigate to home page after successful POST
            navigate('/');
          },
          onError: (error) => {
            console.error('Failed to send user flow exit data:', error);
            // Still navigate to home even if the API call fails
            // You can change this behavior if you want to show an error message instead
            navigate('/');
          },
        },
      );
    } else {
      console.warn('No user ID available for user flow exit tracking');
      // Navigate to home immediately if no user ID
      navigate('/');
    }
  }

  return (
    <div className="h-full p-6 bg-background-default flex flex-col gap-4">
      {/* Fixed header section */}
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center">
          {/* Top Matches Title - Fixed */}
          <TypographyMultiSize
            text={t('results.title')}
            variant_small="h4"
            variant_large="h2"
            fontWeight={700}
            color="text.primary"
            className="mt-6 mb-4 pb-4"
          />
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Top Matches Section - Scrollable */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Scrollable product list */}
        <div className="flex-1 min-h-0 overflow-auto flex justify-center">
          <div className="flex flex-col gap-4 pb-4 w-full max-w-9/10">
            {filteredMatches.map((match, index) => (
              <div key={index} className="flex-shrink-0">
                <ProductTileHorizontalRanked
                  image={match.image}
                  brand={match.brand}
                  description={match.description}
                  type={match.type}
                  price={match.price}
                  availability={match.availability}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* QR code link */}
        <SmallLarge
          child_large={<QRCodeBanner link="https://beautechful.com" />}
          child_small={<div />}
        />

        {/* Fixed footer button - always visible */}
        <div className="flex justify-center mt-4 mb-2 flex-shrink-0">
          {/* <NavButton text={t('results.exitButton')} url="/" /> */}
          <DefaultButton
            text={t('results.exitButton')}
            handleClick={PressExitButton}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsScreenVertical;
