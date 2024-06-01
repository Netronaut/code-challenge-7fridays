"use client";

import { formatCurrency } from "@/lib/format";
import { useCart } from "@/lib/useCart";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export const Cart = () => {
  const router = useRouter();
  const { cart } = useCart();
  const total =
    cart?.reduce(
      (sum, { count, product: { price } }) => sum + price * count,
      0
    ) || 0;

  return (
    <Button onClick={() => router.push("/checkout")}>
      <ShoppingCart />
      {formatCurrency(total / 100)}
    </Button>
  );
};
