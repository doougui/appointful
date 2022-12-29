import { RequestError } from '@infra/http/errors/request-error';

export class DentistAlreadyExists extends RequestError {
  constructor() {
    super('This dentist already exists.');
  }
}
