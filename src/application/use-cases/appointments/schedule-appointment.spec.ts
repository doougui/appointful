import { describe, expect, it } from 'vitest';
import { ScheduleAppointment } from './schedule-appointment';
import { Appointment } from '@application/entities/appointment';
import { getFutureDate } from '@tests/utils/get-future-date';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { makePatient } from '@tests/factories/patient-factory';
import { makeDentist } from '@tests/factories/dentist-factory';

describe('ScheduleAppointment', () => {
  it('should be able to schedule an appointment', async () => {
    const startsAt = getFutureDate('2022-12-10');
    const endsAt = getFutureDate('2022-12-11');

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new ScheduleAppointment(appointmentsRepository);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to schedule an appointment with overlapping dates', async () => {
    const date = '2022-12-10';

    const startsAt = getFutureDate(`${date} 09:00`);
    const endsAt = getFutureDate(`${date} 12:00`);

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new ScheduleAppointment(appointmentsRepository);

    const dentist = makeDentist({}, 'dentist-1');

    await createAppointment.execute({
      patient: makePatient(),
      dentist: dentist,
      startsAt,
      endsAt,
    });

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist,
        startsAt: getFutureDate(`${date} 11:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist,
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 14:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist,
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist,
        startsAt: getFutureDate(`${date} 09:30`),
        endsAt: getFutureDate(`${date} 11:30`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist(),
        startsAt: getFutureDate(`${date} 09:30`),
        endsAt: getFutureDate(`${date} 11:30`),
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should be able to schedule an appointment at the same time with different dentists', async () => {
    const date = '2022-12-10';

    const startsAt = getFutureDate(`${date} 09:00`);
    const endsAt = getFutureDate(`${date} 12:00`);

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new ScheduleAppointment(appointmentsRepository);

    await createAppointment.execute({
      patient: makePatient(),
      dentist: makeDentist({}, 'dentist-1'),
      startsAt,
      endsAt,
    });

    await expect(
      createAppointment.execute({
        patient: makePatient(),
        dentist: makeDentist({}, 'dentist-2'),
        startsAt: getFutureDate(`${date} 09:00`),
        endsAt: getFutureDate(`${date} 12:00`),
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });
});
