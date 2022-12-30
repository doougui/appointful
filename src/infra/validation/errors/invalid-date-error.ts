import { ValidationError } from './validation-error';

export class InvalidDateError extends ValidationError {
  constructor(param: string) {
    super(`The ${param} date is invalid.`);
  }
}
