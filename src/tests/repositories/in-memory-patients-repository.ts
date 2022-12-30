import { Patient } from '@application/entities/patient';
import { PatientsRepository } from '@application/repositories/patients-repository';

export class InMemoryPatientsRepository implements PatientsRepository {
  public patients: Patient[] = [];

  async findAll() {
    return this.patients;
  }

  async findById(patientId: string) {
    const patient = this.patients.find((item) => item.id === patientId);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findByEmail(email: string) {
    const patient = this.patients.find((item) => item.email.value === email);

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

  async delete(patientId: string) {
    const patients = this.patients.filter((item) => item.id !== patientId);
    this.patients = patients;
  }
}
