import { DentistsRepository } from '@application/repositories/dentists-repository';

export class GetDentists {
  constructor(private dentistsRepository: DentistsRepository) {}

  async execute() {
    const dentists = await this.dentistsRepository.findAll();

    return { dentists };
  }
}
