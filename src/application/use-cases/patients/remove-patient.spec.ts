import { makePatient } from '@tests/factories/patient-factory';
import { InMemoryPatientsRepository } from '@tests/repositories/in-memory-patients-repository';
import { describe, expect, it } from 'vitest';
import { PatientNotFound } from './errors/patient-not-found';
import { RemovePatient } from './remove-patient';

describe('RemovePatient', () => {
  it('should remove the patient', async () => {
    const patientsRepository = new InMemoryPatientsRepository();
    const removePatient = new RemovePatient(patientsRepository);

    await patientsRepository.create(makePatient({}, 'patient-1'));
    await patientsRepository.create(makePatient({}, 'patient-2'));
    await patientsRepository.create(makePatient({}, 'patient-3'));

    expect(patientsRepository.patients).toHaveLength(3);

    await removePatient.execute({ patientId: 'patient-1' });

    expect(patientsRepository.patients).toHaveLength(2);
    expect(
      patientsRepository.patients.find((item) => item.id === 'patient-1'),
    ).toBeUndefined();
  });

  it('should throw an error if patient does not exist', async () => {
    const patientsRepository = new InMemoryPatientsRepository();
    const removePatient = new RemovePatient(patientsRepository);

    await patientsRepository.create(makePatient({}, 'patient-1'));
    await patientsRepository.create(makePatient({}, 'patient-2'));
    await patientsRepository.create(makePatient({}, 'patient-3'));

    expect(
      removePatient.execute({ patientId: 'non-existent-patient' }),
    ).rejects.toThrow(PatientNotFound);
  });
});
