import { InvalidParamError } from '@infra/http/errors/invalid-param';

export class AppointmentWithOverlappingDates extends InvalidParamError {
  constructor() {
    super('Another appointment overlaps this appointment dates.');
  }
}
