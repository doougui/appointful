import { makeAppointment } from '@tests/factories/appointment-factory';
import { makeDentist } from '@tests/factories/dentist-factory';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { describe, expect, it } from 'vitest';
import { GetDentistAppointments } from './get-dentist-appointments';

describe('GetDentistAppointments', () => {
  it('gets a list of dentist appointments', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const getDentistAppointments = new GetDentistAppointments(
      appointmentsRepository,
    );

    const dentist = makeDentist({}, 'dentist-1');

    await appointmentsRepository.create(makeAppointment({ dentist }));
    await appointmentsRepository.create(makeAppointment({ dentist }));
    await appointmentsRepository.create(makeAppointment({ dentist }));

    await appointmentsRepository.create(
      makeAppointment({ dentist: makeDentist() }),
    );

    const { appointments } = await getDentistAppointments.execute({
      dentistId: 'dentist-1',
    });

    expect(appointments).toHaveLength(3);
    expect(appointments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dentist: expect.objectContaining({
            _id: 'dentist-1',
          }),
        }),
      ]),
    );
  });
});
