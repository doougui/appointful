import { Controller } from '@application/infra/controller';
import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { PrismaPatientsRepository } from '@infra/database/prisma/repositories/prisma-patients-repository';
import {
  ScheduleAppointmentController,
  ScheduleAppointmentControllerRequest,
} from '@infra/http/controllers/appointments/schedule-appointment-controller';

export function makeScheduleAppointmentsController(): Controller<ScheduleAppointmentControllerRequest> {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const appointmentsUseCase = new ScheduleAppointment(
    prismaAppointmentsRepository,
    prismaPatientsRepository,
    prismaDentistsRepository,
  );
  const appointmentsController = new ScheduleAppointmentController(
    appointmentsUseCase,
  );

  return appointmentsController;
}
