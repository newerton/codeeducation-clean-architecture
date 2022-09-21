import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendMessage1WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-message1-when-customer-is-created.handler";
import SendMessage2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-message2-when-customer-is-created.handler";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";
import SendMessageWhenAddressCustomerIsUpdatedHandler from "./handler/send-message-when-address-customer-is-updated.handler";

describe("Customer Domain events tests", () => {
  it("should register an customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister an client created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should unregister all customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
    });
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify send message when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressCustomerIsUpdatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

    customer.changeAddress(address);

    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      customer: {
        id: "123",
        name: "Customer 1",
        address: {
          street: "Street 2",
          number: 2,
          zip_code: "Zip Code 2",
          city: "City 2",
        },
      },
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toBeCalled();
  });
});
