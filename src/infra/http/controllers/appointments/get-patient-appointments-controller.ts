import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { GetPatientAppointments } from '@application/use-cases/appointments/get-patient-appointments';
import {
  GetPatientAppointmentsInputDTO,
  GetPatientAppointmentsOutputDTO,
} from '@infra/http/dtos/appointments/get-patient-appointments-dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment-view-model';

export class GetPatientAppointmentsController
  implements
    Controller<GetPatientAppointmentsInputDTO, GetPatientAppointmentsOutputDTO>
{
  constructor(private getPatientAppointments: GetPatientAppointments) {}

  async handle(request: GetPatientAppointmentsInputDTO) {
    const { patientId } = request;

    const { appointments } = await this.getPatientAppointments.execute({
      patientId,
    });

    return ok<GetPatientAppointmentsOutputDTO>(
      appointments.map(AppointmentViewModel.toHTTP),
    );
  }
}
