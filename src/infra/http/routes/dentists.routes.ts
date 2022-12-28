import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeGetDentistsController } from '../factories/controllers/dentists/get-dentists-controller-factory';

const dentistsRoutes = Router();

dentistsRoutes.get('/', adaptRoute(makeGetDentistsController()));

export { dentistsRoutes };
