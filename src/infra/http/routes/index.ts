import { Router } from 'express';
import { appointmentsRoutes } from './appointments.routes';
import { dentistsRoutes } from './dentists.routes';
import { patientsRoutes } from './patients.routes';

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/dentists', dentistsRoutes);
router.use('/patients', patientsRoutes);

export { router };
