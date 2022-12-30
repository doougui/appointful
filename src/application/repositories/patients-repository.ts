import { Patient } from '@application/entities/patient';

export interface PatientsRepository {
  findAll: () => Promise<Patient[]>;
  findById: (patientId: string) => Promise<Patient | null>;
  findByEmail: (email: string) => Promise<Patient | null>;
  delete: (patientId: string) => Promise<void>;
  create: (patient: Patient) => Promise<void>;
  save: (patient: Patient) => Promise<void>;
}
