import { RequestError } from '@infra/http/errors/request-error';

export class InvalidDatesError extends RequestError {
  constructor() {
    super('The provided dates are invalid');
  }
}
