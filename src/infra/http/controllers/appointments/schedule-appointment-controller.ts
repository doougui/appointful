import { Controller } from '@application/infra/controller';
import { created } from '@application/infra/http-response';
import { InvalidDentistError } from '@application/use-cases/appointments/errors/invalid-dentist';
import { InvalidPatientError } from '@application/use-cases/appointments/errors/invalid-patient';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
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

  async handle(request: ScheduleAppointmentControllerRequest) {
    const {
      dentistId,
      patientId,
      startsAt: rawStartsAt,
      endsAt: rawEndsAt,
    } = request;

    const startsAt = parseISO(rawStartsAt);
    const endsAt = parseISO(rawEndsAt);

    if (!patientId) throw new InvalidPatientError();
    if (!dentistId) throw new InvalidDentistError();

    if (!isValidDate(startsAt) || !isValidDate(endsAt)) {
      throw new InvalidDatesError();
    }

    await this.scheduleAppointmentUseCase.execute({
      dentistId,
      patientId,
      startsAt,
      endsAt,
    });

    return created();
  }
}
