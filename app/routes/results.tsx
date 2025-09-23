import { Navigate, useLocation } from 'react-router';

import { ResultLayout } from '~/components/layouts/result-layout';
import { mockResults } from '~/features/results/mockData/results';
import ResultsScreenVertical from '~/features/results/results-screen-vertical';
import { translateProductsToMatches } from '~/features/results/utils/result-translate';

const mockAnalysisResults = [
  { label: 'Skin Tone', value: 'Fair' },
  { label: 'Undertone', value: 'Cool' },
  { label: 'Skin Type', value: 'Dry' },
];

const ResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results ?? mockResults;

  if (!results) {
    // Redirect to a fallback page if no data is passed
    return <Navigate to="/" />;
  }
  console.log('Results:', results);

  // const matches = translateProductsToMatches(results.products).slice(0, 10);
  const matches = translateProductsToMatches(results.products);

  return (
    <ResultLayout>
      <ResultsScreenVertical
        analysisResults={mockAnalysisResults}
        topMatches={matches}
      />
    </ResultLayout>
  );
};

export default ResultsPage;
