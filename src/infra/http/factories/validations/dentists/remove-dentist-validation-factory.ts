import { Validator } from '@application/infra/validator';
import { RemoveDentistInputDTO } from '@infra/http/dtos/dentists/remove-dentist-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidationComposite } from '@infra/validation/validation-composite';

export function makeRemoveDentistValidation() {
  const validations: Validator<RemoveDentistInputDTO>[] = [];

  for (const field of ['dentistId']) {
    validations.push(new RequiredFieldValidation<RemoveDentistInputDTO>(field));
  }

  return new ValidationComposite(validations);
}
