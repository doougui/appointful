import { Patient as PatientEntity } from '@application/entities/patient';
import { Email } from '@application/entities/value-objects/email';
import { Patient } from '@prisma/client';

export class PrismaPatientMapper {
  static toPrisma(patient: PatientEntity) {
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email.value,
      phone: patient.phone,
      createdAt: patient.createdAt,
    };
  }

  static toDomain(patient: Patient) {
    return new PatientEntity(
      {
        name: patient.name,
        email: new Email(patient.email),
        phone: patient.phone,
        createdAt: patient.createdAt,
      },
      patient.id,
    );
  }
}
