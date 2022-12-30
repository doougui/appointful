import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeGetPatientsController } from '../factories/controllers/patients/get-patients-controller-factory';
import { makeRegisterPatientController } from '../factories/controllers/patients/register-patient-controller-factory';

const patientsRoutes = Router();

patientsRoutes.get('/', adaptRoute(makeGetPatientsController()));
patientsRoutes.post('/register', adaptRoute(makeRegisterPatientController()));

export { patientsRoutes };
