import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeGetPatientsController } from '../factories/controllers/patients/get-patients-controller-factory';

const patientsRoutes = Router();

patientsRoutes.get('/', adaptRoute(makeGetPatientsController()));

export { patientsRoutes };
