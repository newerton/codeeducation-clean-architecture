import OrderItem from "./order_item";

export default interface OrderInterface {
  get id(): string;
  get customerId(): string;
  get items(): OrderItem[];
}
