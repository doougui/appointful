import { RemoveDentist } from '@application/use-cases/dentists/remove-dentist';
import { PrismaDentistsRepository } from '@infra/database/prisma/repositories/prisma-dentists-repository';
import { RemoveDentistController } from '@infra/http/controllers/dentists/remove-dentist-controller';

export function makeRemoveDentistController() {
  const prismaDentistsRepository = new PrismaDentistsRepository();
  const removeDentistUseCase = new RemoveDentist(prismaDentistsRepository);

  const removeDentistController = new RemoveDentistController(
    removeDentistUseCase,
  );

  return removeDentistController;
}
