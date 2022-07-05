import { Publisher, Subjects, TicketCreatedEvent } from "@dudakovict-ticketing/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated
}