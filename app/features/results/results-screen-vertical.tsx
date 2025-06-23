import { Typography } from '@mui/material';
import React from 'react';

import { NavButton } from '~/components/ui/nav-button';

import { ProductTileHorizontalRanked } from '../../components/ui/product-tile';

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
          Your Top Matches
        </Typography>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto flex flex-col justify-start">
            <div className="h-600 bg-amber-300"></div>
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
  analysisResults,
  topMatches,
}: ResultsScreenVerticalProps) {
  return (
    <div className="h-full p-6 bg-background-default flex flex-col gap-4">
      {/* Fixed header section */}
      <div className="flex-shrink-0">
        {/* Analysis Results Section */}
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          className="mb-4"
        >
          Your analysis results
        </Typography>
        <div className="flex gap-4 overflow-x-auto py-2">
          {analysisResults.map((result, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-background-paper p-4 rounded-lg shadow-sm flex-shrink-0"
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

        {/* Top Matches Title - Fixed */}
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          className="mt-6 mb-4"
        >
          Your Top Matches
        </Typography>
      </div>

      {/* Top Matches Section - Scrollable */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Scrollable product list */}
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="flex flex-col gap-4 pb-4">
            {topMatches.map((match, index) => (
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

        {/* Fixed footer button - always visible */}
        <div className="flex justify-center mt-4 mb-2 flex-shrink-0">
          <NavButton text="Exit the analysis" url="/" />
        </div>
      </div>
    </div>
  );
}

export default ResultsScreenVertical;
