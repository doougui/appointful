import { areIntervalsOverlapping } from 'date-fns';
import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async findById(appointmentId: string) {
    const appointment = this.appointments.find(
      (item) => item.id === appointmentId,
    );

    if (!appointment) {
      return null;
    }

    return appointment;
  }

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.appointments.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true },
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }

  async save(appointment: Appointment) {
    const appointmentIndex = this.appointments.findIndex(
      (item) => item.id === appointment.id,
    );

    if (appointmentIndex >= 0) {
      this.appointments[appointmentIndex] = appointment;
    }
  }
}
