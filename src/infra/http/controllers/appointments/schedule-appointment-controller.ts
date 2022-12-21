import { Controller } from '@application/infra/controller';
import { clientError, created, fail } from '@application/infra/http-response';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import { InvalidParamError } from '@infra/http/errors/invalid-param';
import { isValidDate } from '@utils/is-valid-date';
import { parseISO } from 'date-fns';
import { InvalidDatesError } from './errors/invalid-dates';

export type ScheduleAppointmentControllerRequest = {
  patientId: string;
  dentistId: string;
  startsAt: string;
  endsAt: string;
};

export class ScheduleAppointmentController
  implements Controller<ScheduleAppointmentControllerRequest>
{
  constructor(private scheduleAppointmentUseCase: ScheduleAppointment) {}

  private async handleErrors(e: unknown) {
    if (!(e instanceof Error)) return fail(e);

    if (e instanceof InvalidParamError) {
      return clientError(e);
    }

    return fail(e);
  }

  async handle(request: ScheduleAppointmentControllerRequest) {
    const {
      dentistId,
      patientId,
      startsAt: rawStartsAt,
      endsAt: rawEndsAt,
    } = request;

    const startsAt = parseISO(rawStartsAt);
    const endsAt = parseISO(rawEndsAt);

    if (!isValidDate(startsAt) || !isValidDate(endsAt)) {
      return clientError(new InvalidDatesError());
    }

    try {
      await this.scheduleAppointmentUseCase.execute({
        dentistId,
        patientId,
        startsAt,
        endsAt,
      });
    } catch (e) {
      return this.handleErrors(e);
    }

    return created();
  }
}
