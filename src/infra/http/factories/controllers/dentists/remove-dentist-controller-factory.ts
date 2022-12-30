import { RemoveDentist } from '@application/use-cases/dentists/remove-dentist';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { RemoveDentistController } from '@infra/http/controllers/dentists/remove-dentist-controller';
import { makeRemoveDentistValidation } from '../../validations/dentists/remove-dentist-validation-factory';

export function makeRemoveDentistController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const removeDentistUseCase = new RemoveDentist(prismaDentistsRepository);

  const removeDentistValidation = makeRemoveDentistValidation();

  const removeDentistController = new RemoveDentistController(
    removeDentistUseCase,
    removeDentistValidation,
  );

  return removeDentistController;
}
