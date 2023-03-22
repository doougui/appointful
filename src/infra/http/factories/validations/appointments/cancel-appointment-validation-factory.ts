import { Validator } from '@application/infra/validator';
import { CancelAppointmentInputDTO } from '@infra/http/dtos/appointments/cancel-appointment-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidationComposite } from '@infra/validation/validation-composite';

export function makeCancelAppointmentValidation() {
  const validations: Validator<CancelAppointmentInputDTO>[] = [];

  for (const field of ['appointmentId']) {
    validations.push(
      new RequiredFieldValidation<CancelAppointmentInputDTO>(field),
    );
  }

  return new ValidationComposite(validations);
}
