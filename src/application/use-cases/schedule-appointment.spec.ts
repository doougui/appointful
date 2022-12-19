import { describe, expect, it } from 'vitest';
import { CreateAppointment } from './schedule-appointment';
import { Appointment } from '@application/entities/appointment';
import { getFutureDate } from '@tests/utils/get-future-date';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { makePatient } from '@tests/factories/patient-factory';
import { makeDentist } from '@tests/factories/dentist-factory';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const startsAt = getFutureDate('2022-12-10');
    const endsAt = getFutureDate('2022-12-11');

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const date = '2022-12-10';

    const startsAt = getFutureDate(`${date} 09:00`);
    const endsAt = getFutureDate(`${date} 12:00`);

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      patient: makePatient(),
      dentist: makeDentist(),
      startsAt,
      endsAt,
    });

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt: getFutureDate(`${date} 11:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 14:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt: getFutureDate(`${date} 09:30`),
        endsAt: getFutureDate(`${date} 11:30`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);
  });
});
