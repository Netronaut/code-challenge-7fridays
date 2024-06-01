"use client";

import { Product } from "@/lib/product";
import { useQuery } from "@/lib/useQuery";
import clsx from "clsx";
import slugify from "slugify";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
  const { data, error } = useQuery<{ products: Array<Product> }>(`
      query GetAllProducts {
        products {
          id
          name
          price
          description
        }
      }
  `);

  if (error) {
    return <div className="bg-red-500 text-red-50">{error.message}</div>;
  }

  if (!data) {
    return <div>🌪️ Loading..</div>;
  }

  const { products } = data;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
      {products.map((item) => (
        <a
          key={item.id}
          href={`/${slugify(item.name, { lower: true })}-${item.id}`}
          className={clsx(
            "group rounded-lg border border-transparent px-5 py-4 transition-colors",
            "hover:border-gray-300 hover:bg-gray-100",
            "hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          )}
        >
          <ProductItem product={item} />
        </a>
      ))}
    </div>
  );
};
