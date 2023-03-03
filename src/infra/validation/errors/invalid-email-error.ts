import { ValidationError } from './validation-error';

export class InvalidEmailError extends ValidationError {
  constructor() {
    super('The provided email address is invalid.');
  }
}
