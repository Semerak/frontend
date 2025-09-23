import { useLocation } from 'react-router';

import { BundleLayout } from '~/components/layouts/bundle-layout';
import { BundleScreen } from '~/features/bundle/bundle-screen';
import type { Product } from '~/features/results/types';

export default function Bundle() {
  const location = useLocation();
  const product = location.state?.product as Product;

  return (
    <BundleLayout>
      <BundleScreen product={product} />
    </BundleLayout>
  );
}
