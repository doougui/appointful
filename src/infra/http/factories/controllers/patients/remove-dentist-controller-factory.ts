import { RemovePatient } from '@application/use-cases/patients/remove-patient';
import { PrismaPatientsRepository } from '@infra/database/prisma/repositories/prisma-patients-repository';
import { RemovePatientController } from '@infra/http/controllers/patients/remove-patient-controller';
import { makeRemovePatientValidation } from '../../validations/patients/remove-patient-validation-factory';

export function makeRemovePatientController() {
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const removePatientUseCase = new RemovePatient(prismaPatientsRepository);

  const removePatientValidation = makeRemovePatientValidation();

  const removePatientController = new RemovePatientController(
    removePatientUseCase,
    removePatientValidation,
  );

  return removePatientController;
}
