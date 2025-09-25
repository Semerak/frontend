import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { ResultLayout } from '~/components/layouts/result-layout';
import LoadingScreen from '~/features/loading-screen/loading-screen';
import { useGetResultsByUserId } from '~/features/results/hooks/use-results-hook';
import ResultsScreenVertical from '~/features/results/results-screen-vertical';
import { translateProductsToMatches } from '~/features/results/utils/result-translate';

const mockAnalysisResults = [
  { label: 'Skin Tone', value: 'Fair' },
  { label: 'Undertone', value: 'Cool' },
  { label: 'Skin Type', value: 'Dry' },
];

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const { mutate: fetchResults, data, isPending } = useGetResultsByUserId();

  useEffect(() => {
    if (userId) {
      fetchResults(userId);
    }
  }, [fetchResults, userId]);

  if (isPending || !data) {
    return <LoadingScreen />;
  }

  const matches = translateProductsToMatches(data.products);

  return (
    <ResultLayout userId={data.user_id}>
      <ResultsScreenVertical
        analysisResults={mockAnalysisResults}
        topMatches={matches}
      />
    </ResultLayout>
  );
};

export default ResultsPage;
