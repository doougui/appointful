import { Patient } from '@application/entities/patient';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { prisma } from '../client';
import { PrismaPatientMapper } from '../mappers/prisma-patient-mapper';

export class PrismaPatientsRepository implements PatientsRepository {
  async findAll() {
    const patients = await prisma.dentist.findMany();

    return patients.map(PrismaPatientMapper.toDomain);
  }

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

  async findByEmail(email: string) {
    const patient = await prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      return null;
    }

    return PrismaPatientMapper.toDomain(patient);
  }

  async create(patient: Patient) {
    const raw = PrismaPatientMapper.toPrisma(patient);

    await prisma.dentist.create({
      data: raw,
    });
  }

  async save(patient: Patient) {
    const raw = PrismaPatientMapper.toPrisma(patient);

    await prisma.patient.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(patientId: string) {
    await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });
  }
}
