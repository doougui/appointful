import { Controller } from '@application/infra/controller';
import { created } from '@application/infra/http-response';
import { CreateDentist } from '@application/use-cases/dentists/create-dentist';
import {
  CreateDentistInputDTO,
  CreateDentistOutputDTO,
} from '@infra/http/dtos/dentists/create-dentist-dto';
import { DentistViewModel } from '@infra/http/view-models/dentist-view-model';

export class CreateDentistController
  implements Controller<CreateDentistInputDTO, CreateDentistOutputDTO>
{
  constructor(private createDentist: CreateDentist) {}

  async handle(request: CreateDentistInputDTO) {
    const { name, email } = request;

    const { dentist } = await this.createDentist.execute({ name, email });

    return created<CreateDentistOutputDTO>(DentistViewModel.toHTTP(dentist));
  }
}
