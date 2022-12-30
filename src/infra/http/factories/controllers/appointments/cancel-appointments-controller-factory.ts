import { CancelAppointment } from '@application/use-cases/appointments/cancel-appointment';
import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { CancelAppointmentController } from '@infra/http/controllers/appointments/cancel-appointment-controller';
import { makeCancelAppointmentValidation } from '../../validations/appointments/cancel-appointment-validation-factory';

export function makeCancelAppointmentController() {
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository();
  const cancelAppointmentUseCase = new CancelAppointment(
    prismaAppointmentsRepository,
  );
  const cancelAppointmentValidator = makeCancelAppointmentValidation();

  const cancelAppointmentController = new CancelAppointmentController(
    cancelAppointmentUseCase,
    cancelAppointmentValidator,
  );

  return cancelAppointmentController;
}
