import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { inject, injectable } from 'tsyringe';

interface GetPatientAppointmentsRequest {
  patientId: string;
}

@injectable()
export class GetPatientAppointments {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  async execute(request: GetPatientAppointmentsRequest) {
    const { patientId } = request;

    const appointments = await this.appointmentsRepository.findManyByPatientId(
      patientId,
    );

    return { appointments };
  }
}
