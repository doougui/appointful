import { Appointment as AppointmentEntity } from '@application/entities/appointment';
import { Appointment } from '@prisma/client';

export class PrismaAppointmentMapper {
  static toPrisma(appointment: AppointmentEntity) {
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      dentistId: appointment.dentistId,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
      canceledAt: appointment.canceledAt,
      createdAt: appointment.createdAt,
    };
  }

  static toDomain(appointment: Appointment) {
    return new AppointmentEntity({
      patientId: appointment.patientId,
      dentistId: appointment.dentistId,
      startsAt: new Date(appointment.startsAt),
      endsAt: new Date(appointment.endsAt),
      canceledAt: appointment.canceledAt,
      createdAt: appointment.createdAt,
    });
  }
}
