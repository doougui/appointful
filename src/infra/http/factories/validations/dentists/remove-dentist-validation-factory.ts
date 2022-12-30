import { Validator } from '@application/infra/validator';
import { RemoveDentistInputDTO } from '@infra/http/dtos/dentists/remove-dentist-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidatorCompositor } from '@infra/validation/validator-compositor';

export function makeRemoveDentistValidation() {
  const validations: Validator<RemoveDentistInputDTO>[] = [];

  for (const field of ['dentistId']) {
    validations.push(new RequiredFieldValidation<RemoveDentistInputDTO>(field));
  }

  return new ValidatorCompositor(validations);
}
