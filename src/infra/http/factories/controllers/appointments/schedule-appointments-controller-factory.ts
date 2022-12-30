import { ScheduleAppointment } from '@application/use-cases/appointments/schedule-appointment';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { PrismaPatientsRepository } from '@infra/database/prisma/repositories/prisma-patients-repository';
import { ScheduleAppointmentController } from '@infra/http/controllers/appointments/schedule-appointment-controller';
import { makeScheduleAppointmentValidation } from '../../validations/appointments/schedule-appointment-validation-factory';

export function makeScheduleAppointmentsController() {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const appointmentsUseCase = new ScheduleAppointment(
    prismaAppointmentsRepository,
    prismaPatientsRepository,
    prismaDentistsRepository,
  );
  const scheduleAppointmentValidation = makeScheduleAppointmentValidation();

  const scheduleAppointmentsController = new ScheduleAppointmentController(
    appointmentsUseCase,
    scheduleAppointmentValidation,
  );

  return scheduleAppointmentsController;
}
