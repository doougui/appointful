import { Appointment } from '@application/entities/appointment';
import { Dentist } from '@application/entities/dentist';

export interface AppointmentsRepository {
  findById: (appointmentId: string) => Promise<Appointment | null>;
  findManyByPatientId: (patientId: string) => Promise<Appointment[]>;
  findOverlappingAppointment: (
    startsAt: Date,
    endsAt: Date,
    dentist: Dentist,
  ) => Promise<Appointment | null>;
  create: (appointment: Appointment) => Promise<void>;
  save: (appointment: Appointment) => Promise<void>;
}
