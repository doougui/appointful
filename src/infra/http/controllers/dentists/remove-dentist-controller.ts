import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { RemoveDentist } from '@application/use-cases/dentists/remove-dentist';
import { RemoveDentistInputDTO } from '@infra/http/dtos/dentists/remove-dentist-dto';

export class RemoveDentistController
  implements Controller<RemoveDentistInputDTO>
{
  constructor(private removeDentist: RemoveDentist) {}

  async handle(request: RemoveDentistInputDTO) {
    const { dentistId } = request;

    await this.removeDentist.execute({ dentistId });

    return ok();
  }
}
