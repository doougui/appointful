import { Controller } from '@application/infra/controller';
import { clientError, ok } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { RemoveDentist } from '@application/use-cases/dentists/remove-dentist';
import { RemoveDentistInputDTO } from '@infra/http/dtos/dentists/remove-dentist-dto';

export class RemoveDentistController
  implements Controller<RemoveDentistInputDTO>
{
  constructor(
    private removeDentist: RemoveDentist,
    private validation: Validator<RemoveDentistInputDTO>,
  ) {}

  async handle(request: RemoveDentistInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const { dentistId } = request;

    await this.removeDentist.execute({ dentistId });

    return ok();
  }
}
