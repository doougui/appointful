import { RequestError } from '@infra/http/errors/request-error';

export class ValidationError extends RequestError {
  constructor(message?: string) {
    super(message ?? 'Validation failed.');
  }
}
