import { EmailValidatorAdapter } from '@application/infra/adapters/email-validation-adapter';
import { Validator } from '@application/infra/validator';
import { RegisterPatientInputDTO } from '@infra/http/dtos/patients/register-patient-dto';
import { EmailFieldValidation } from '@infra/validation/email-field-validation';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidationComposite } from '@infra/validation/validation-composite';

export function makeRegisterPatientValidation() {
  const validations: Validator<RegisterPatientInputDTO>[] = [];

  for (const field of ['name', 'email', 'phone']) {
    validations.push(
      new RequiredFieldValidation<RegisterPatientInputDTO>(field),
    );
  }

  validations.push(
    new EmailFieldValidation('email', new EmailValidatorAdapter()),
  );

  return new ValidationComposite(validations);
}
