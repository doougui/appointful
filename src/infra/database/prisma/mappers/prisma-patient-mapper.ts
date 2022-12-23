import { Patient as PatientEntity } from '@application/entities/patient';
import { Email } from '@application/entities/value-objects/email';
import { Patient } from '@prisma/client';

export class PrismaPatientMapper {
  static toDomain(patient: Patient) {
    return new PatientEntity({
      name: patient.name,
      email: new Email(patient.email),
      phone: patient.phone,
      createdAt: patient.createdAt,
    });
  }
}
