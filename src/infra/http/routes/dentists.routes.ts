import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeRegisterDentistController } from '../factories/controllers/dentists/register-dentist-controller-factory';
import { makeGetDentistsController } from '../factories/controllers/dentists/get-dentists-controller-factory';

const dentistsRoutes = Router();

dentistsRoutes.get('/', adaptRoute(makeGetDentistsController()));
dentistsRoutes.post('/register', adaptRoute(makeRegisterDentistController()));

export { dentistsRoutes };
