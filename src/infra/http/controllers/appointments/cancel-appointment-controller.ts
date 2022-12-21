import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { CancelAppointment } from '@application/use-cases/appointments/cancel-appointment';

export type CancelAppointmentControllerRequest = {
  appointmentId: string;
};

export class CancelAppointmentController
  implements Controller<CancelAppointmentControllerRequest>
{
  constructor(private cancelAppointment: CancelAppointment) {}

  async handle(request: CancelAppointmentControllerRequest) {
    const { appointmentId } = request;

    await this.cancelAppointment.execute({ appointmentId });

    return ok();
  }
}
