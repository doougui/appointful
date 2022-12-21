import { InvalidParamError } from '@infra/http/errors/invalid-param';

export class InvalidPatientError extends InvalidParamError {
  constructor() {
    super('Invalid patient.');
  }
}
