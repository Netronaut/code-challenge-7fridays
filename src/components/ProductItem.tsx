import { formatCurrency } from "@/lib/format";
import { Product } from "@/lib/product";

export const ProductItem = ({ product }: { product: Product }) => {
  const { name, price, description } = product;
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
        {formatCurrency(price / 100)}
      </p>
      <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
        {description}
      </p>
    </div>
  );
};
