import { RequestError } from '@infra/http/errors/request-error';

export class InvalidPatientError extends RequestError {
  constructor() {
    super('Invalid patient.');
  }
}
