import { Patient } from '@application/entities/patient';

export type PatientHttpViewModel = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export class PatientViewModel {
  static toHTTP(patient: Patient): PatientHttpViewModel {
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email.value,
      phone: patient.phone,
      createdAt: patient.createdAt,
    };
  }
}
