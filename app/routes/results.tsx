import { Navigate, useLocation } from 'react-router';

import { ResultLayout } from '~/components/layouts/result-layout';
import { translateProductsToMatches } from '~/features/results/utils/result-translate';

import ResultsScreenHorizontal from '../features/results/results-screen-horizontal';

const mockAnalysisResults = [
  { label: 'Skin Tone', value: 'Fair' },
  { label: 'Undertone', value: 'Cool' },
  { label: 'Skin Type', value: 'Dry' },
];

const ResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    // Redirect to a fallback page if no data is passed
    return <Navigate to="/" />;
  }

  const matches = translateProductsToMatches(results.products).slice(0, 10);

  return (
    <ResultLayout>
      <ResultsScreenHorizontal
        analysisResults={mockAnalysisResults}
        topMatches={matches}
      />
    </ResultLayout>
  );
};

export default ResultsPage;
