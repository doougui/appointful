import { Validator } from '@application/infra/validator';
import { RemovePatientInputDTO } from '@infra/http/dtos/patients/remove-patient-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidatorCompositor } from '@infra/validation/validator-compositor';

export function makeRemovePatientValidation() {
  const validations: Validator<RemovePatientInputDTO>[] = [];

  for (const field of ['patientId']) {
    validations.push(new RequiredFieldValidation<RemovePatientInputDTO>(field));
  }

  return new ValidatorCompositor(validations);
}
