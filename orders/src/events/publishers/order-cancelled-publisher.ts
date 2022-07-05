import { Publisher, OrderCancelledEvent, Subjects } from "@dudakovict-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled
}