import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { GetDentistAppointments } from '@application/use-cases/appointments/get-dentist-appointments';
import {
  GetDentistAppointmentsInputDTO,
  GetDentistAppointmentsOutputDTO,
} from '@infra/http/dtos/appointments/get-dentist-appointments-dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment-view-model';

export class GetDentistAppointmentsController
  implements
    Controller<GetDentistAppointmentsInputDTO, GetDentistAppointmentsOutputDTO>
{
  constructor(private getDentistAppointments: GetDentistAppointments) {}

  async handle(request: GetDentistAppointmentsInputDTO) {
    const { dentistId } = request;

    const { appointments } = await this.getDentistAppointments.execute({
      dentistId,
    });

    return ok<GetDentistAppointmentsOutputDTO>({
      appointments: appointments.map(AppointmentViewModel.toHTTP),
    });
  }
}
