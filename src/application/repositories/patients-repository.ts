import { Patient } from '@application/entities/patient';

export interface PatientsRepository {
  findById: (patientId: string) => Promise<Patient | null>;
  create: (patient: Patient) => Promise<void>;
  save: (patient: Patient) => Promise<void>;
}
