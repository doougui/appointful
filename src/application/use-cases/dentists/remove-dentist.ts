import { DentistsRepository } from '@application/repositories/dentists-repository';
import { DentistNotFound } from './errors/dentist-not-found';

interface RemoveDentistRequest {
  dentistId: string;
}

export class RemoveDentist {
  constructor(private dentistsRepository: DentistsRepository) {}

  async execute(request: RemoveDentistRequest) {
    const { dentistId } = request;

    const dentist = await this.dentistsRepository.findById(dentistId);

    if (!dentist) {
      throw new DentistNotFound();
    }

    await this.dentistsRepository.delete(dentistId);
  }
}
