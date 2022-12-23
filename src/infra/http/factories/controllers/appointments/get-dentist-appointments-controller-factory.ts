import { GetDentistAppointments } from '@application/use-cases/appointments/get-dentist-appointments';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { GetDentistAppointmentsController } from '@infra/http/controllers/appointments/get-dentist-appointments-controller';

export function makeGetDentistAppointmentsController() {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const getDentistAppointmentsUseCase = new GetDentistAppointments(
    prismaAppointmentsRepository,
  );

  const getDentistAppointmentsController = new GetDentistAppointmentsController(
    getDentistAppointmentsUseCase,
  );

  return getDentistAppointmentsController;
}
