import { DentistsRepository } from '@application/repositories/dentists-repository';

export class PrismaDentistsRepository implements DentistsRepository {
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
