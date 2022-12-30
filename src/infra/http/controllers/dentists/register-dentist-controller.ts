import { Controller } from '@application/infra/controller';
import { clientError, created } from '@application/infra/http-response';
import { Validator } from '@application/infra/validator';
import { RegisterDentist } from '@application/use-cases/dentists/register-dentist';
import {
  RegisterDentistInputDTO,
  RegisterDentistOutputDTO,
} from '@infra/http/dtos/dentists/register-dentist-dto';
import { DentistViewModel } from '@infra/http/view-models/dentist-view-model';

export class RegisterDentistController
  implements Controller<RegisterDentistInputDTO, RegisterDentistOutputDTO>
{
  constructor(
    private registerDentist: RegisterDentist,
    private validation: Validator<RegisterDentistInputDTO>,
  ) {}

  async handle(request: RegisterDentistInputDTO) {
    const validationError = this.validation.validate(request);
    if (validationError) {
      return clientError(validationError);
    }

    const { name, email } = request;

    const { dentist } = await this.registerDentist.execute({ name, email });

    return created<RegisterDentistOutputDTO>(DentistViewModel.toHTTP(dentist));
  }
}
