import { Validator } from '@application/infra/validator';
import { RegisterPatientInputDTO } from '@infra/http/dtos/patients/register-patient-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidatorCompositor } from '@infra/validation/validator-compositor';

export function makeRegisterPatientValidation() {
  const validations: Validator<RegisterPatientInputDTO>[] = [];

  for (const field of ['name', 'email', 'phone']) {
    validations.push(
      new RequiredFieldValidation<RegisterPatientInputDTO>(field),
    );
  }

  return new ValidatorCompositor(validations);
}
