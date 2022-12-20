import { makeAppointment } from '@tests/factories/appointment-factory';
import { makePatient } from '@tests/factories/patient-factory';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { describe, expect, it } from 'vitest';
import { GetPatientAppointments } from './get-patient-appointments';

describe('GetPatientAppointments', () => {
  it('gets a list of patient appointments', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const getPatientAppointments = new GetPatientAppointments(
      appointmentsRepository,
    );

    const patient = makePatient({}, 'patient-1');

    await appointmentsRepository.create(makeAppointment({ patient }));
    await appointmentsRepository.create(makeAppointment({ patient }));
    await appointmentsRepository.create(makeAppointment({ patient }));

    await appointmentsRepository.create(
      makeAppointment({ patient: makePatient() }),
    );

    const { appointments } = await getPatientAppointments.execute({
      patientId: 'patient-1',
    });

    expect(appointments).toHaveLength(3);
    expect(appointments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          patient: expect.objectContaining({
            _id: 'patient-1',
          }),
        }),
      ]),
    );
  });
});
