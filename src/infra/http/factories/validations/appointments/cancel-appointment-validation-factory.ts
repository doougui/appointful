import { Validator } from '@application/infra/validator';
import { CancelAppointmentInputDTO } from '@infra/http/dtos/appointments/cancel-appointment-dto';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidatorCompositor } from '@infra/validation/validator-compositor';

export function makeCancelAppointmentValidation() {
  const validations: Validator<CancelAppointmentInputDTO>[] = [];

  for (const field of ['appointmentId']) {
    validations.push(
      new RequiredFieldValidation<CancelAppointmentInputDTO>(field),
    );
  }

  return new ValidatorCompositor(validations);
}
