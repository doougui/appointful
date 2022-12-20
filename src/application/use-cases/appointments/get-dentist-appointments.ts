import { AppointmentsRepository } from '@application/repositories/appointments-repository';

interface GetDentistAppointmentsRequest {
  dentistId: string;
}

export class GetDentistAppointments {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(request: GetDentistAppointmentsRequest) {
    const { dentistId } = request;

    const appointments = await this.appointmentsRepository.findManyByDentistId(
      dentistId,
    );

    return { appointments };
  }
}
