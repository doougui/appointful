import { Appointment } from '@application/entities/appointment';

export type AppointmentHttpViewModel = {
  id: string;
  patientId: string;
  dentistId: string;
  startsAt: Date;
  endsAt: Date;
  canceledAt: Date | null;
  createdAt: Date;
};

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment): AppointmentHttpViewModel {
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      dentistId: appointment.dentistId,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
      canceledAt: appointment.canceledAt ?? null,
      createdAt: appointment.createdAt,
    };
  }
}
