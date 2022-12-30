import { Controller } from '@application/infra/controller';
import { clientError, created } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { RegisterPatient } from '@application/use-cases/patients/register-patient';
import {
  RegisterPatientInputDTO,
  RegisterPatientOutputDTO,
} from '@infra/http/dtos/patients/register-patient-dto';
import { PatientViewModel } from '@infra/http/view-models/patient-view-model';

export class RegisterPatientController
  implements Controller<RegisterPatientInputDTO, RegisterPatientOutputDTO>
{
  constructor(
    private registerPatient: RegisterPatient,
    private validation: Validator<RegisterPatientInputDTO>,
  ) {}

  async handle(request: RegisterPatientInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const { name, email, phone } = request;

    const { patient } = await this.registerPatient.execute({
      name,
      email,
      phone,
    });

    return created<RegisterPatientOutputDTO>(PatientViewModel.toHTTP(patient));
  }
}
