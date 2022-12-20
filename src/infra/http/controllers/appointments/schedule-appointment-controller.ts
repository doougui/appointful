import { Controller } from '@application/infra/controller';
import { created } from '@application/infra/http-response';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';

export type ScheduleAppointmentControllerRequest = {
  patient: string;
  dentist: string;
  startsAt: string;
  endsAt: string;
};

export class ScheduleAppointmentController
  implements Controller<ScheduleAppointmentControllerRequest>
{
  constructor(private scheduleAppointmentUseCase: ScheduleAppointment) {}

  async handle() {
    return created();
  }
}
