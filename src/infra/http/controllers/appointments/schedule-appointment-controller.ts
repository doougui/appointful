import { Controller } from '@application/infra/controller';
import { clientError, created } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import {
  ScheduleAppointmentInputDTO,
  ScheduleAppointmentOutputDTO,
} from '@infra/http/dtos/appointments/schedule-appointment-dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment-view-model';
import { parseISO } from 'date-fns';

export class ScheduleAppointmentController
  implements
    Controller<ScheduleAppointmentInputDTO, ScheduleAppointmentOutputDTO>
{
  constructor(
    private scheduleAppointmentUseCase: ScheduleAppointment,
    private validation: Validator<ScheduleAppointmentInputDTO>,
  ) {}

  async handle(request: ScheduleAppointmentInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const {
      dentistId,
      patientId,
      startsAt: rawStartsAt,
      endsAt: rawEndsAt,
    } = request;

    const startsAt = parseISO(rawStartsAt);
    const endsAt = parseISO(rawEndsAt);

    const { appointment } = await this.scheduleAppointmentUseCase.execute({
      dentistId,
      patientId,
      startsAt,
      endsAt,
    });

    return created(AppointmentViewModel.toHTTP(appointment));
  }
}
