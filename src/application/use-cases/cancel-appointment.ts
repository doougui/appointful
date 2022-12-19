import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { inject, injectable } from 'tsyringe';
import { AppointmentNotFound } from './errors/appointment-not-found';

interface CancelAppointmentRequest {
  appointmentId: string;
}

@injectable()
export class CancelAppointment {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute(request: CancelAppointmentRequest) {
    const { appointmentId } = request;

    const appointment = await this.appointmentsRepository.findById(
      appointmentId,
    );

    if (!appointment) {
      throw new AppointmentNotFound();
    }

    appointment.cancel();

    this.appointmentsRepository.save(appointment);
  }
}
