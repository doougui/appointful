import { Router } from 'express';
import { appointmentsRoutes } from './appointments.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);

export { router };
