import { Validator } from '@application/infra/validator';
import { RegisterDentistInputDTO } from '@infra/http/dtos/dentists/register-dentist-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidatorCompositor } from '@infra/validation/validator-compositor';

export function makeRegisterDentistValidation() {
  const validations: Validator<RegisterDentistInputDTO>[] = [];

  for (const field of ['name', 'email']) {
    validations.push(
      new RequiredFieldValidation<RegisterDentistInputDTO>(field),
    );
  }

  return new ValidatorCompositor(validations);
}
