import { Publisher, Subjects, TicketUpdatedEvent } from "@dudakovict-ticketing/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated
}