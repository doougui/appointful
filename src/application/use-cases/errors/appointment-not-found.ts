export class AppointmentNotFound extends Error {
  constructor() {
    super('Appointment not found.');
  }
}
