import { RegisterDentist } from '@application/use-cases/dentists/register-dentist';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { RegisterDentistController } from '@infra/http/controllers/dentists/register-dentist-controller';

export function makeRegisterDentistController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const registerDentistUseCase = new RegisterDentist(prismaDentistsRepository);

  const registerDentistController = new RegisterDentistController(
    registerDentistUseCase,
  );

  return registerDentistController;
}
