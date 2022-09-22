import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product", () => {
    const product = ProductFactory.create({ name: "Product", price: 1 });

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });
});
