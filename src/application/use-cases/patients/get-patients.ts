import { PatientsRepository } from '@application/repositories/patients-repository';

export class GetPatients {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute() {
    const patients = await this.patientsRepository.findAll();

    return { patients };
  }
}
