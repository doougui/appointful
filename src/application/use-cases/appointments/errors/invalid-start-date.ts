import { RequestError } from '@infra/http/errors/request-error';

export class InvalidStartDateError extends RequestError {
  constructor() {
    super('Start date must be greater than the current date.');
  }
}
