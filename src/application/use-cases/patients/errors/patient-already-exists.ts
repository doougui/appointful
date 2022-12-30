import { RequestError } from '@infra/http/errors/request-error';

export class PatientAlreadyExists extends RequestError {
  constructor() {
    super('This patient already exists.');
  }
}
