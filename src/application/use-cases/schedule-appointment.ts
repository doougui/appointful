import { inject, injectable } from 'tsyringe';
import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { Patient } from '@application/entities/patient';
import { Dentist } from '@application/entities/dentist';

interface CreateAppointmentRequest {
  patient: Patient;
  dentist: Dentist;
  startsAt: Date;
  endsAt: Date;
  canceledAt?: Date | null;
}

type CreateAppointmentResponse = Appointment;

@injectable()
export class CreateAppointment {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute({
    patient,
    dentist,
    startsAt,
    endsAt,
    canceledAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
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

    return appointment;
  }
}
