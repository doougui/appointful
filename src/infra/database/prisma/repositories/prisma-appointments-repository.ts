import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { prisma } from '../client';
import { PrismaAppointmentMapper } from '../mappers/prisma-appointment-mapper';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async findById(appointmentId: string) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      return null;
    }

    return PrismaAppointmentMapper.toDomain(appointment);
  }

  async findManyByPatientId(patientId: string) {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId,
      },
    });

    return appointments.map(PrismaAppointmentMapper.toDomain);
  }

  async findManyByDentistId(dentistId: string) {
    const appointments = await prisma.appointment.findMany({
      where: {
        dentistId,
      },
    });

    return appointments.map(PrismaAppointmentMapper.toDomain);
  }

  async findOverlappingAppointment() {
    return null;
  }

  async create(appointment: Appointment) {
    const raw = PrismaAppointmentMapper.toPrisma(appointment);

    await prisma.appointment.create({
      data: raw,
    });
  }

  async save(appointment: Appointment) {
    const raw = PrismaAppointmentMapper.toPrisma(appointment);

    await prisma.appointment.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
