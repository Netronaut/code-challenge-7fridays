"use client";

import { Button } from "@/components/Button";
import { ProductItem } from "@/components/ProductItem";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/lib/useCart";
import { Minus, Plus, Trash } from "lucide-react";
import { Fragment } from "react";

export default function Page() {
  const { cart, cartStore } = useCart();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center justify-items-center">
      {cart?.map(({ count, product }) => (
        <Fragment key={product.id}>
          <ProductItem product={product} />
          <span>{formatCurrency(product.price / 100)}</span>
          <span>{count}</span>
          <span className="flex flex-row gap-4">
            <Button border={false} onClick={() => cartStore.change(product, 1)}>
              <Plus size={18} />
            </Button>
            <Button
              border={false}
              onClick={() =>
                count > 1
                  ? cartStore.change(product, -1)
                  : cartStore.remove(product)
              }
            >
              <Minus size={18} />
            </Button>
            <Button border={false} onClick={() => cartStore.remove(product)}>
              <Trash size={18} />
            </Button>
          </span>
        </Fragment>
      ))}
    </div>
  );
}
