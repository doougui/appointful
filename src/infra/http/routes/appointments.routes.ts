import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeCancelAppointmentController } from '../factories/controllers/appointments/cancel-appointments-controller-factory';
import { makeScheduleAppointmentsController } from '../factories/controllers/appointments/schedule-appointments-controller-factory';

const appointmentsRoutes = Router();

appointmentsRoutes.post(
  '/schedule',
  adaptRoute(makeScheduleAppointmentsController()),
);

appointmentsRoutes.patch(
  '/cancel/:appointmentId',
  adaptRoute(makeCancelAppointmentController()),
);

export { appointmentsRoutes };
