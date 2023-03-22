import { Validator } from '@application/infra/validator';
import { ScheduleAppointmentInputDTO } from '@infra/http/dtos/appointments/schedule-appointment-dto';
import { DateFieldValidation } from '@infra/validation/date-field-validation';
import { RequiredFieldValidation } from '@infra/validation/required-field-validation';
import { ValidationComposite } from '@infra/validation/validation-composite';

export function makeScheduleAppointmentValidation() {
  const validations: Validator<ScheduleAppointmentInputDTO>[] = [];

  for (const field of ['patientId', 'dentistId', 'startsAt', 'endsAt']) {
    validations.push(
      new RequiredFieldValidation<ScheduleAppointmentInputDTO>(field),
    );
  }

  for (const field of ['startsAt', 'endsAt']) {
    validations.push(
      new DateFieldValidation<ScheduleAppointmentInputDTO>(field),
    );
  }

  return new ValidationComposite(validations);
}
