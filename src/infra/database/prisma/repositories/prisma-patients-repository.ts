import { PatientsRepository } from '@application/repositories/patients-repository';
import { prisma } from '../client';
import { PrismaPatientMapper } from '../mappers/prisma-patient-mapper';

export class PrismaPatientsRepository implements PatientsRepository {
  async findById(patientId: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return null;
    }

    return PrismaPatientMapper.toDomain(patient);
  }

  async save() {
    throw new Error('Method not implemented.');
  }

  async create() {
    throw new Error('Method not implemented.');
  }
}
