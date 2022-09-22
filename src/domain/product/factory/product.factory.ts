import Product from "../entity/product";
import { v4 as uuid } from "uuid";
import { ProductFactoryProps } from "../../customer/factory/customer.factory.interface";

export default class ProductFactory {
  public static create(props: ProductFactoryProps): Product {
    const { name, price } = props;
    return new Product(uuid(), name, price);
  }
}
