import { Appointment } from '@application/entities/appointment';
import { ScheduleAppointmentOutputDTO } from '../dtos/schedule-appointment-dto';

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment): ScheduleAppointmentOutputDTO {
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
