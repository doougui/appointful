import { Appointment } from '@application/entities/appointment';
import { Dentist } from '@application/entities/dentist';

export interface AppointmentsRepository {
  create: (appointment: Appointment) => Promise<void>;
  findById: (appointmentId: string) => Promise<Appointment | null>;
  findOverlappingAppointment: (
    startsAt: Date,
    endsAt: Date,
    dentist: Dentist,
  ) => Promise<Appointment | null>;
  save: (appointment: Appointment) => Promise<void>;
}
