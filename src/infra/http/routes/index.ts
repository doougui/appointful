import { Router } from 'express';
import { appointmentsRoutes } from './appointments.routes';
import { dentistsRoutes } from './dentists.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/dentists', dentistsRoutes);

export { router };
