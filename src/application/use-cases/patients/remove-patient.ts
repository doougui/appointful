import { PatientsRepository } from '@application/repositories/patients-repository';
import { PatientNotFound } from './errors/patient-not-found';

interface RemovePatientRequest {
  patientId: string;
}

export class RemovePatient {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute(request: RemovePatientRequest) {
    const { patientId } = request;

    const patient = await this.patientsRepository.findById(patientId);

    if (!patient) {
      throw new PatientNotFound();
    }

    await this.patientsRepository.delete(patientId);
  }
}
