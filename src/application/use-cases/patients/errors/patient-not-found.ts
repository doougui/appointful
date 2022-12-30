import { RequestError } from '@infra/http/errors/request-error';

export class PatientNotFound extends RequestError {
  constructor() {
    super('Patient not found.');
  }
}
