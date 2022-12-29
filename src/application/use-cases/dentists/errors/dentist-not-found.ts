import { RequestError } from '@infra/http/errors/request-error';

export class DentistNotFound extends RequestError {
  constructor() {
    super('Dentist not found.');
  }
}
