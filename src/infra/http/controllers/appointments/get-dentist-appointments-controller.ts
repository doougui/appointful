import { Appointment } from '@application/entities/appointment';
import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { GetDentistAppointments } from '@application/use-cases/appointments/get-dentist-appointments';

export type GetDentistAppointmentsControllerRequest = {
  dentistId: string;
};

export class GetDentistAppointmentsController
  implements Controller<GetDentistAppointmentsControllerRequest, Appointment[]>
{
  constructor(private getDentistAppointments: GetDentistAppointments) {}

  async handle(request: GetDentistAppointmentsControllerRequest) {
    const { dentistId } = request;

    const { appointments } = await this.getDentistAppointments.execute({
      dentistId,
    });

    return ok<Appointment[]>(appointments);
  }
}
