import { Patient } from '@application/entities/patient';
import { Email } from '@application/entities/value-objects/email';
import { makePatient } from '@tests/factories/patient-factory';
import { InMemoryPatientsRepository } from '@tests/repositories/in-memory-patients-repository';
import { describe, expect, it } from 'vitest';
import { RegisterPatient } from './register-patient';
import { PatientAlreadyExists } from './errors/patient-already-exists';

describe('RegisterPatient', () => {
  it('should register a patient', async () => {
    const patientsRepository = new InMemoryPatientsRepository();
    const registerPatient = new RegisterPatient(patientsRepository);

    const { patient } = await registerPatient.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '+55 55 55555-5555',
    });

    expect(patient).toBeInstanceOf(Patient);
    expect(patientsRepository.patients[0].name).toBe('John Doe');
  });

  it('should not be able to register a patient that already exists', async () => {
    const patientsRepository = new InMemoryPatientsRepository();
    const registerPatient = new RegisterPatient(patientsRepository);

    const patient = makePatient({
      email: new Email('existing@email.com'),
    });
    await patientsRepository.create(patient);

    expect(
      registerPatient.execute({
        name: 'John Doe',
        email: 'existing@email.com',
        phone: '+55 55 55555-5555',
      }),
    ).rejects.toBeInstanceOf(PatientAlreadyExists);
  });
});
