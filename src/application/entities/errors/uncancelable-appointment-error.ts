import { InputError } from 'src/errors/input-error';

export class UncancelableAppointment extends InputError {
  constructor() {
    super("It's not possible to cancel an appointment that is in the past.");
  }
}
