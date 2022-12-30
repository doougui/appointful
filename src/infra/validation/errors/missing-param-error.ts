import { ValidationError } from './validation-error';

export class MissingParamError extends ValidationError {
  constructor(param: string) {
    super(`The ${param} parameter is missing.`);
  }
}
