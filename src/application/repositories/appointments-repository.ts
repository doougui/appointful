import { Appointment } from '@application/entities/appointment';

export interface AppointmentsRepository {
  create: (appointment: Appointment) => Promise<void>;
  findById: (appointmentId: string) => Promise<Appointment | null>;
  findOverlappingAppointment: (
    startsAt: Date,
    endsAt: Date,
  ) => Promise<Appointment | null>;
  save: (appointment: Appointment) => Promise<void>;
}
