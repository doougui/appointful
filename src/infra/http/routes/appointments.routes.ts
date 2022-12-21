import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeScheduleAppointmentsController } from '../factories/controllers/appointments/schedule-appointments-controller-factory';

const appointmentsRoutes = Router();

appointmentsRoutes.post(
  '/schedule',
  adaptRoute(makeScheduleAppointmentsController()),
);

export { appointmentsRoutes };
