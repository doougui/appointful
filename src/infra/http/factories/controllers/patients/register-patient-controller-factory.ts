import { RegisterPatient } from '@application/use-cases/patients/register-patient';
import { PrismaPatientsRepository } from '@infra/database/prisma/repositories/prisma-patients-repository';
import { RegisterPatientController } from '@infra/http/controllers/patients/register-patient-controller';
import { makeRegisterPatientValidation } from '../../validations/patients/register-patient-validation-factory';

export function makeRegisterPatientController() {
  const prismaPatientsRepository = new PrismaPatientsRepository();
  const registerPatientUseCase = new RegisterPatient(prismaPatientsRepository);

  const registerPatientValidation = makeRegisterPatientValidation();

  const registerPatientController = new RegisterPatientController(
    registerPatientUseCase,
    registerPatientValidation,
  );

  return registerPatientController;
}
