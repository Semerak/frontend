import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { BundleLayout } from '~/components/layouts/bundle-layout';
import { BundleScreen } from '~/features/bundle/bundle-screen';
import { useGetBundle } from '~/features/bundle/hooks/use-get-bundle';
import { mockBundle } from '~/features/bundle/mockData/bundle';
import LoadingScreen from '~/features/loading-screen/loading-screen';

export default function Bundle() {
  const { mutate: fetchBundle, data, isPending } = useGetBundle();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (productId && userId) {
      fetchBundle({ userId: userId, productId: productId });
    }
  }, [fetchBundle, productId, userId]);

  const bundle = data ?? mockBundle;

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <BundleLayout>
      <BundleScreen bundle={bundle} />
    </BundleLayout>
  );
}
