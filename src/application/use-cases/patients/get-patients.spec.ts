import { makePatient } from '@tests/factories/patient-factory';
import { InMemoryPatientsRepository } from '@tests/repositories/in-memory-patients-repository';
import { describe, expect, it } from 'vitest';
import { GetPatients } from './get-patients';

describe('GetPatients', () => {
  it('should return patients', async () => {
    const patientsRepository = new InMemoryPatientsRepository();
    const getPatients = new GetPatients(patientsRepository);

    patientsRepository.create(makePatient());
    patientsRepository.create(makePatient());
    patientsRepository.create(makePatient());

    const { patients } = await getPatients.execute();

    expect(patients).toHaveLength(3);
    expect(patients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
