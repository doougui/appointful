import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { inject, injectable } from 'tsyringe';

interface GetDentistAppointmentsRequest {
  dentistId: string;
}

@injectable()
export class GetDentistAppointments {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute(request: GetDentistAppointmentsRequest) {
    const { dentistId } = request;

    const appointments = await this.appointmentsRepository.findManyByDentistId(
      dentistId,
    );

    return { appointments };
  }
}
