import { GetDentists } from '@application/use-cases/dentists/get-dentists';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { GetDentistsController } from '@infra/http/controllers/dentists/get-dentists-controller';

export function makeGetDentistsController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const getDentistsUseCase = new GetDentists(prismaDentistsRepository);

  const getDentistsController = new GetDentistsController(getDentistsUseCase);

  return getDentistsController;
}
