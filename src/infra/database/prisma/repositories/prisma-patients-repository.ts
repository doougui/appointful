import { PatientsRepository } from '@application/repositories/patients-repository';

export class PrismaPatientsRepository implements PatientsRepository {
  async findById() {
    return null;
  }

  async save() {
    throw new Error('Method not implemented.');
  }

  async create() {
    throw new Error('Method not implemented.');
  }
}
