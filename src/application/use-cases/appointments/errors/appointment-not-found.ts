import { RequestError } from '@infra/http/errors/request-error';

export class AppointmentNotFound extends RequestError {
  constructor() {
    super('Appointment not found.');
  }
}
