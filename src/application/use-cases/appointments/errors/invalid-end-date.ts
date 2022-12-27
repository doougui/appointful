import { RequestError } from '@infra/http/errors/request-error';

export class InvalidEndDateError extends RequestError {
  constructor() {
    super('End date must be greater than the start date.');
  }
}
