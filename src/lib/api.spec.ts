import { server } from "@/lib/api";
import { describe, expect, setSystemTime, test } from "bun:test";
import assert from "node:assert";

describe("api", () => {
  test("query `health` returns current timestamp", async () => {
    const now = new Date("2024-05-31T09:00:00");
    setSystemTime(now);
    const response = await server.executeOperation({
      query: "query { health }",
      variables: {},
    });

    // Note the use of Node's assert rather than Jest's expect; if using
    // TypeScript, `assert`` will appropriately narrow the type of `body`
    // and `expect` will not.
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.health).toBe(
      now.getTime().toString()
    );
  });

  test("query `products` returns a list of products", async () => {
    const response = await server.executeOperation({
      query: "query { products { id name price } }",
      variables: {},
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toHaveProperty("products");
    expect(response.body.singleResult.data?.products).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });

  test("query `product(id)` returns a product", async () => {
    const response = await server.executeOperation({
      query: "query { product(id:12345) { id name price description } }",
      variables: {},
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toHaveProperty("product");
    expect(response.body.singleResult.data?.product).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
      })
    );
  });
});
