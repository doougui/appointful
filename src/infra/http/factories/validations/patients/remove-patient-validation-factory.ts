import { Validator } from '@application/infra/validator';
import { RemovePatientInputDTO } from '@infra/http/dtos/patients/remove-patient-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidationComposite } from '@infra/validation/validation-composite';

export function makeRemovePatientValidation() {
  const validations: Validator<RemovePatientInputDTO>[] = [];

  for (const field of ['patientId']) {
    validations.push(new RequiredFieldValidation<RemovePatientInputDTO>(field));
  }

  return new ValidationComposite(validations);
}
