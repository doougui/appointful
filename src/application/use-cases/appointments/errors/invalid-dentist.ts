import { InvalidParamError } from '@infra/http/errors/invalid-param';

export class InvalidDentistError extends InvalidParamError {
  constructor() {
    super('Invalid dentist.');
  }
}
