import { GetPatientAppointments } from '@application/use-cases/appointments/get-patient-appointments';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { GetPatientAppointmentsController } from '@infra/http/controllers/appointments/get-patient-appointments-controller';

export function makeGetPatientAppointmentsController() {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const getPatientAppointmentsUseCase = new GetPatientAppointments(
    prismaAppointmentsRepository,
  );

  const getPatientAppointmentsController = new GetPatientAppointmentsController(
    getPatientAppointmentsUseCase,
  );

  return getPatientAppointmentsController;
}
