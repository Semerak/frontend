import { ProductAvailability } from '~/features/results/components/product-availability';
import type { Product } from '~/features/results/types';

export const BundleProduct = ({ product }: { product: Product }) => {
  const { image, brand, price, availability, description } = product;
  return (
    <div className="p-3 shadow-md rounded-md sm:flex sm:flex-col bg-white grid grid-cols-5 sm:grid-cols-none">
      <img
        src={image}
        alt={brand}
        className="object-contain sm:h-60 h-30 col-span-1 flex justify-center items-center w-full sm:bg-[#F2F2F2] rounded-md p-1"
      />
      <div className="flex flex-col text-left col-span-4 py-4 px-2 gap-3">
        <p className="text-sm sm:text-base text-black line-clamp-">
          {`${brand} ${description}`}
        </p>
        <ProductAvailability availability={availability} price={price} />
      </div>
    </div>
  );
};
