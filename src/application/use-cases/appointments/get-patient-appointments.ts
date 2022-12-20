import { AppointmentsRepository } from '@application/repositories/appointments-repository';

interface GetPatientAppointmentsRequest {
  patientId: string;
}

export class GetPatientAppointments {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(request: GetPatientAppointmentsRequest) {
    const { patientId } = request;

    const appointments = await this.appointmentsRepository.findManyByPatientId(
      patientId,
    );

    return { appointments };
  }
}
