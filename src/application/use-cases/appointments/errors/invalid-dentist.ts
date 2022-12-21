import { RequestError } from '@infra/http/errors/request-error';

export class InvalidDentistError extends RequestError {
  constructor() {
    super('Invalid dentist.');
  }
}
