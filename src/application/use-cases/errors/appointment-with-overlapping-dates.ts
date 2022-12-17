export class AppointmentWithOverlappingDates extends Error {
  constructor() {
    super('Another appointment overlaps this appointment dates.');
  }
}
