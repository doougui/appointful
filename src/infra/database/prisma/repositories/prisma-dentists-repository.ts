import { DentistsRepository } from '@application/repositories/dentists-repository';
import { prisma } from '../client';
import { PrismaDentistMapper } from '../mappers/prisma-dentist-mapper';

export class PrismaDentistsRepository implements DentistsRepository {
  async findById(dentistId: string) {
    const dentist = await prisma.dentist.findUnique({
      where: {
        id: dentistId,
      },
    });

    if (!dentist) {
      return null;
    }

    return PrismaDentistMapper.toDomain(dentist);
  }

  async save() {
    throw new Error('Method not implemented.');
  }

  async create() {
    throw new Error('Method not implemented.');
  }
}
