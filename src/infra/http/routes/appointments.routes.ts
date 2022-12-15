import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointments-controller';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentsController();

appointmentsRoutes.get('/', appointmentsController.index);

export { appointmentsRoutes };
