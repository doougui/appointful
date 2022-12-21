import { Dentist } from '@application/entities/dentist';
import { DentistsRepository } from '@application/repositories/dentists-repository';

export class InMemoryDentistsRepository implements DentistsRepository {
  public dentists: Dentist[] = [];

  async findById(dentistId: string) {
    const dentist = this.dentists.find((item) => item.id === dentistId);

    if (!dentist) {
      return null;
    }

    return dentist;
  }

  async create(dentist: Dentist): Promise<void> {
    this.dentists.push(dentist);
  }

  async save(dentist: Dentist) {
    const dentistIndex = this.dentists.findIndex(
      (item) => item.id === dentist.id,
    );

    if (dentistIndex >= 0) {
      this.dentists[dentistIndex] = dentist;
    }
  }
}
