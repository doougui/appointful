import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeRegisterDentistController } from '../factories/controllers/dentists/register-dentist-controller-factory';
import { makeGetDentistsController } from '../factories/controllers/dentists/get-dentists-controller-factory';
import { makeRemoveDentistController } from '../factories/controllers/dentists/remove-dentist-controller-factory';

const dentistsRoutes = Router();

dentistsRoutes.get('/', adaptRoute(makeGetDentistsController()));
dentistsRoutes.post('/', adaptRoute(makeRegisterDentistController()));
dentistsRoutes.delete('/:dentistId', adaptRoute(makeRemoveDentistController()));

export { dentistsRoutes };
