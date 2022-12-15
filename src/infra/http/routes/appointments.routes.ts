import { Router } from 'express';
import { container } from 'tsyringe';
import { AppointmentsController } from '../controllers/appointments-controller';

const appointmentsRoutes = Router();

const appointmentsController = container.resolve(AppointmentsController);

appointmentsRoutes.get('/', appointmentsController.index);

export { appointmentsRoutes };
