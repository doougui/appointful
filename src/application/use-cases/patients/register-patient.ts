import { Patient } from '@application/entities/patient';
import { Email } from '@application/entities/value-objects/email';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { PatientAlreadyExists } from './errors/patient-already-exists';

interface RegisterPatientRequest {
  name: string;
  email: string;
  phone: string;
}

export class RegisterPatient {
  constructor(private patientsRepository: PatientsRepository) {}

  private async validate(request: RegisterPatientRequest) {
    const { email } = request;

    const patientExists = await this.patientsRepository.findByEmail(email);

    if (patientExists) throw new PatientAlreadyExists();
  }

  async execute(request: RegisterPatientRequest) {
    await this.validate(request);

    const { name, email, phone } = request;

    const patient = new Patient({
      name,
      email: new Email(email),
      phone,
    });

    await this.patientsRepository.create(patient);

    return { patient };
  }
}
