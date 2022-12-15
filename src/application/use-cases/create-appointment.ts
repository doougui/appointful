import { inject, injectable } from 'tsyringe';
import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

@injectable()
export class CreateAppointment {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
      );

    if (overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates.');
    }

    const appointment = new Appointment({ customer, startsAt, endsAt });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
