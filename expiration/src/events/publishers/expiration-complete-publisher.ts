import { Publisher, ExpirationCompleteEvent, Subjects } from "@dudakovict-ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete
}