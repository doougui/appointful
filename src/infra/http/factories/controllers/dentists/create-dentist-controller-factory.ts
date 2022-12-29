import { CreateDentist } from '@application/use-cases/dentists/create-dentist';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { CreateDentistController } from '@infra/http/controllers/dentists/create-dentist-controller';

export function makeCreateDentistController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const createDentistUseCase = new CreateDentist(prismaDentistsRepository);

  const createDentistController = new CreateDentistController(
    createDentistUseCase,
  );

  return createDentistController;
}
