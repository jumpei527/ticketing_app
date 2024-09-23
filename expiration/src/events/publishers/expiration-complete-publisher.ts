import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@jp_tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
