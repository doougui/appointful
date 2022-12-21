import { InvalidParamError } from '@infra/http/errors/invalid-param';

export class InvalidDatesError extends InvalidParamError {
  constructor() {
    super('The provided dates are invalid');
  }
}
