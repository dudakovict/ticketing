import { Publisher, PaymentCreatedEvent, Subjects } from "@dudakovict-ticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated
}