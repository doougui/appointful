import { Controller } from '@application/infra/controller';
import { created } from '@application/infra/http-response';
import { InvalidDentistError } from '@application/use-cases/appointments/errors/invalid-dentist';
import { InvalidPatientError } from '@application/use-cases/appointments/errors/invalid-patient';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import {
  ScheduleAppointmentInputDTO,
  ScheduleAppointmentOutputDTO,
} from '@infra/http/dtos/appointments/schedule-appointment-dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment-view-model';
import { isValidDate } from '@utils/is-valid-date';
import { parseISO } from 'date-fns';
import { InvalidDatesError } from './errors/invalid-dates';

export class ScheduleAppointmentController
  implements
    Controller<ScheduleAppointmentInputDTO, ScheduleAppointmentOutputDTO>
{
  constructor(private scheduleAppointmentUseCase: ScheduleAppointment) {}

  async handle(request: ScheduleAppointmentInputDTO) {
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

    const { appointment } = await this.scheduleAppointmentUseCase.execute({
      dentistId,
      patientId,
      startsAt,
      endsAt,
    });

    return created(AppointmentViewModel.toHTTP(appointment));
  }
}
