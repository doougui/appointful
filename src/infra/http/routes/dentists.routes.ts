import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeCreateDentistController } from '../factories/controllers/dentists/create-dentist-controller-factory';
import { makeGetDentistsController } from '../factories/controllers/dentists/get-dentists-controller-factory';

const dentistsRoutes = Router();

dentistsRoutes.get('/', adaptRoute(makeGetDentistsController()));
dentistsRoutes.post('/create', adaptRoute(makeCreateDentistController()));

export { dentistsRoutes };
