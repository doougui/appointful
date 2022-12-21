import { Controller } from '@application/infra/controller';
import { CancelAppointment } from '@application/use-cases/appointments/cancel-appointment';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import {
  CancelAppointmentController,
  CancelAppointmentControllerRequest,
} from '@infra/http/controllers/appointments/cancel-appointment-controller';

export function makeCancelAppointmentController(): Controller<CancelAppointmentControllerRequest> {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const cancelAppointmentUseCase = new CancelAppointment(
    prismaAppointmentsRepository,
  );

  const cancelAppointmentController = new CancelAppointmentController(
    cancelAppointmentUseCase,
  );

  return cancelAppointmentController;
}
