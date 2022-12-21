import { RequestError } from '@infra/http/errors/request-error';

export class AppointmentWithOverlappingDates extends RequestError {
  constructor() {
    super('Another appointment overlaps this appointment dates.');
  }
}
