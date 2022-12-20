import { Controller } from '@application/infra/controller';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import {
  ScheduleAppointmentController,
  ScheduleAppointmentControllerRequest,
} from '@infra/http/controllers/appointments/schedule-appointment-controller';

export function makeScheduleAppointmentsController(): Controller<ScheduleAppointmentControllerRequest> {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const appointmentsUseCase = new ScheduleAppointment(
    prismaAppointmentsRepository,
  );
  const appointmentsController = new ScheduleAppointmentController(
    appointmentsUseCase,
  );

  return appointmentsController;
}
