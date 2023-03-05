import { Controller } from '@application/infra/controller';
import { clientError, noContent } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { CancelAppointment } from '@application/use-cases/appointments/cancel-appointment';
import { CancelAppointmentInputDTO } from '@infra/http/dtos/appointments/cancel-appointment-dto';

export class CancelAppointmentController
  implements Controller<CancelAppointmentInputDTO>
{
  constructor(
    private cancelAppointment: CancelAppointment,
    private validation: Validator<CancelAppointmentInputDTO>,
  ) {}

  async handle(request: CancelAppointmentInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const { appointmentId } = request;

    await this.cancelAppointment.execute({ appointmentId });

    return noContent();
  }
}
