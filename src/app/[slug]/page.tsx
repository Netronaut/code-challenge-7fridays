"use client";

import { Button } from "@/components/Button";
import { ProductItem } from "@/components/ProductItem";
import { Product } from "@/lib/product";
import { useCart } from "@/lib/useCart";
import { useQuery } from "@/lib/useQuery";
import { notFound } from "next/navigation";

const ProductView = ({ product }: { product: Product }) => {
  const { cartStore } = useCart();
  return (
    <div className="flex flex-col gap-y-6">
      <ProductItem product={product} />
      <p>
        <Button onClick={() => cartStore.change(product)}>
          In den Warenkorb
        </Button>
      </p>
    </div>
  );
};

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split("-").pop() || "";
  const { error, data, isPending } = useQuery<{ product: Product }>(
    `
      query GetProduct($id: ID) {
        product(id: $id) {
          id
          name
          price
          description
        }
      }
    `,
    { id: parseInt(id) }
  );

  if (error) {
    return <div className="bg-red-500 text-red-50">{error.message}</div>;
  }

  if (isPending) {
    return <div>🌪️ Loading..</div>;
  }

  if (!data || !data.product) {
    notFound();
  }

  const { product } = data;
  return <ProductView product={product} />;
}
