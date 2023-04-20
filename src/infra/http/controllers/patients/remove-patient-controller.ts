import { Controller } from '@application/infra/controller';
import { clientError, noContent } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { RemovePatient } from '@application/use-cases/patients/remove-patient';
import { RemovePatientInputDTO } from '@infra/http/dtos/patients/remove-patient-dto';

export class RemovePatientController
  implements Controller<RemovePatientInputDTO>
{
  constructor(
    private removePatient: RemovePatient,
    private validation: Validator<RemovePatientInputDTO>,
  ) {}

  async handle(request: RemovePatientInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const { patientId } = request;

    await this.removePatient.execute({ patientId });

    return noContent();
  }
}
