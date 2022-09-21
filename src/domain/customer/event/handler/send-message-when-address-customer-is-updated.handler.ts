import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class SendMessageWhenAddressCustomerIsUpdatedHandler
  implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
  handle(event: CustomerAddressUpdatedEvent): void {
    const { street, number, zip_code, city } = event.eventData.customer.address;
    const address = `${street}, ${number} - ${city} - ${zip_code}`;
    console.log(
      `Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${address}`
    );
  }
}
