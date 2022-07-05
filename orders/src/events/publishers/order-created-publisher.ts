import { Publisher, OrderCreatedEvent, Subjects } from "@dudakovict-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated
}