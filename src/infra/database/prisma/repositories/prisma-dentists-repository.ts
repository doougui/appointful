import { Dentist } from '@application/entities/dentist';
import { DentistsRepository } from '@application/repositories/dentists-repository';
import { prisma } from '../client';
import { PrismaDentistMapper } from '../mappers/prisma-dentist-mapper';

export class PrismaDentistsRepository implements DentistsRepository {
  async findAll() {
    const dentists = await prisma.dentist.findMany();

    return dentists.map(PrismaDentistMapper.toDomain);
  }

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

  async findByEmail(email: string) {
    const dentist = await prisma.dentist.findUnique({
      where: { email },
    });

    if (!dentist) {
      return null;
    }

    return PrismaDentistMapper.toDomain(dentist);
  }

  async create(dentist: Dentist) {
    const raw = PrismaDentistMapper.toPrisma(dentist);

    await prisma.dentist.create({
      data: raw,
    });
  }

  async save(dentist: Dentist) {
    const raw = PrismaDentistMapper.toPrisma(dentist);

    await prisma.dentist.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(dentistId: string) {
    await prisma.dentist.delete({
      where: {
        id: dentistId,
      },
    });
  }
}
