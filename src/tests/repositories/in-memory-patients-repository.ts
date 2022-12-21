import { Patient } from '@application/entities/patient';
import { PatientsRepository } from '@application/repositories/patients-repository';

export class InMemoryPatientsRepository implements PatientsRepository {
  public patients: Patient[] = [];

  async findById(patientId: string) {
    const patient = this.patients.find((item) => item.id === patientId);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async create(patient: Patient): Promise<void> {
    this.patients.push(patient);
  }

  async save(patient: Patient) {
    const patientIndex = this.patients.findIndex(
      (item) => item.id === patient.id,
    );

    if (patientIndex >= 0) {
      this.patients[patientIndex] = patient;
    }
  }
}
