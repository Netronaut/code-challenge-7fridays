import { useCart } from "@/lib/useCart";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "bun:test";
import { Cart } from "./Cart";

const mockProduct = {
  id: 2,
  name: "product-a",
  price: 2000,
  description: "a test product",
};

const TestComponent = () => {
  const { cart, cartStore } = useCart();
  return (
    <>
      <div data-testid="cart">
        <Cart />
      </div>
      <div data-testid="product">
        Product: {cart?.map(({ product }) => product.name).join("")}
      </div>
      <button onClick={() => cartStore.change(mockProduct, 1)}>add</button>
      <button onClick={() => cartStore.change(mockProduct, -1)}>remove</button>
      <button onClick={() => cartStore.remove(mockProduct)}>delete</button>
    </>
  );
};

afterEach(() => {
  cleanup();
  localStorage.removeItem("cart");
});

describe("Cart", () => {
  test("should be initially empty", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("cart").textContent).toBe("0,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe("Product: ");
  });

  test("should add product", async () => {
    render(<TestComponent />);
    expect(screen.getByTestId("cart").textContent).toBe("0,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe("Product: ");
    await userEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("cart").textContent).toBe("20,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe(
      "Product: product-a"
    );
  });

  test("should remove product", async () => {
    render(<TestComponent />);
    await userEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("cart").textContent).toBe("20,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe(
      "Product: product-a"
    );
    await userEvent.click(screen.getByText("delete"));
    expect(screen.getByTestId("cart").textContent).toBe("0,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe("Product: ");
  });

  test("should increase product count", async () => {
    render(<TestComponent />);
    const add = screen.getByText("add");
    await userEvent.click(add);
    await userEvent.click(add);
    expect(screen.getByTestId("cart").textContent).toBe("40,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe(
      "Product: product-a"
    );
  });

  test("should decrease product count", async () => {
    render(<TestComponent />);
    await userEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("cart").textContent).toBe("20,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe(
      "Product: product-a"
    );
    await userEvent.click(screen.getByText("remove"));
    expect(screen.getByTestId("cart").textContent).toBe("0,00\xa0€");
    expect(screen.getByTestId("product").textContent).toBe(
      "Product: product-a"
    );
  });
});
