import { RegisterDentist } from '@application/use-cases/dentists/register-dentist';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { RegisterDentistController } from '@infra/http/controllers/dentists/register-dentist-controller';
import { makeRegisterDentistValidation } from '../../validations/dentists/register-dentist-validation-factory';

export function makeRegisterDentistController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const registerDentistUseCase = new RegisterDentist(prismaDentistsRepository);

  const registerDentistValidation = makeRegisterDentistValidation();

  const registerDentistController = new RegisterDentistController(
    registerDentistUseCase,
    registerDentistValidation,
  );

  return registerDentistController;
}
