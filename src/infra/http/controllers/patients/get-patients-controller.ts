import { Controller } from '@application/infra/controller';
import { ok } from '@application/infra/http-response';
import { GetPatients } from '@application/use-cases/patients/get-patients';
import {
  GetPatientsInputDTO,
  GetPatientsOutputDTO,
} from '@infra/http/dtos/patients/get-patients-dto';
import { PatientViewModel } from '@infra/http/view-models/patient-view-model';

export class GetPatientsController
  implements Controller<GetPatientsInputDTO, GetPatientsOutputDTO>
{
  constructor(private getPatients: GetPatients) {}

  async handle() {
    const { patients } = await this.getPatients.execute();

    return ok<GetPatientsOutputDTO>(patients.map(PatientViewModel.toHTTP));
  }
}
