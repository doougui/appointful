import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { GetDentists } from '@application/use-cases/dentists/get-dentists';
import {
  GetDentistsInputDTO,
  GetDentistsOutputDTO,
} from '@infra/http/dtos/dentists/get-dentists-dto';
import { DentistViewModel } from '@infra/http/view-models/dentist-view-model';

export class GetDentistsController
  implements Controller<GetDentistsInputDTO, GetDentistsOutputDTO>
{
  constructor(private getDentists: GetDentists) {}

  async handle() {
    const { dentists } = await this.getDentists.execute();

    return ok<GetDentistsOutputDTO>({
      dentists: dentists.map(DentistViewModel.toHTTP),
    });
  }
}
