import { GetPatients } from '@application/use-cases/patients/get-patients';
import { PrismaPatientsRepository } from '@infra/database/prisma/repositories/prisma-patients-repository';
import { GetPatientsController } from '@infra/http/controllers/patients/get-patients-controller';

export function makeGetPatientsController() {
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const getPatientsUseCase = new GetPatients(prismaPatientsRepository);

  const getPatientsController = new GetPatientsController(getPatientsUseCase);

  return getPatientsController;
}
