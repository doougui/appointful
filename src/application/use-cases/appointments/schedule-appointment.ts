import { Appointment } from '@application/entities/appointment';
import { Dentist } from '@application/entities/dentist';
import { Patient } from '@application/entities/patient';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';

interface ScheduleAppointmentRequest {
  patient: Patient;
  dentist: Dentist;
  startsAt: Date;
  endsAt: Date;
  canceledAt?: Date | null;
}

type ScheduleAppointmentResponse = {
  appointment: Appointment;
};

export class ScheduleAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    patient,
    dentist,
    startsAt,
    endsAt,
    canceledAt,
  }: ScheduleAppointmentRequest): Promise<ScheduleAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
        dentist,
      );

    if (overlappingAppointment) {
      throw new AppointmentWithOverlappingDates();
    }

    const appointment = new Appointment({
      patient,
      dentist,
      startsAt,
      endsAt,
      canceledAt,
    });

    await this.appointmentsRepository.create(appointment);

    return { appointment };
  }
}
