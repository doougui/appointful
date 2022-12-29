import { Controller } from '@application/infra/controller';
import { created } from '@application/infra/http-response';
import { RegisterDentist } from '@application/use-cases/dentists/register-dentist';
import {
  RegisterDentistInputDTO,
  RegisterDentistOutputDTO,
} from '@infra/http/dtos/dentists/register-dentist-dto';
import { DentistViewModel } from '@infra/http/view-models/dentist-view-model';

export class RegisterDentistController
  implements Controller<RegisterDentistInputDTO, RegisterDentistOutputDTO>
{
  constructor(private registerDentist: RegisterDentist) {}

  async handle(request: RegisterDentistInputDTO) {
    const { name, email } = request;

    const { dentist } = await this.registerDentist.execute({ name, email });

    return created<RegisterDentistOutputDTO>(DentistViewModel.toHTTP(dentist));
  }
}
