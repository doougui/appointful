import { makeAppointment } from '@tests/factories/appointment-factory';
import { getFutureDate } from '@tests/utils/get-future-date';
import { describe, expect, it } from 'vitest';
import { Appointment } from './appointment';

describe('Appointment', () => {
  it('creates an appointment', () => {
    const appointment = makeAppointment();
    expect(appointment).toBeInstanceOf(Appointment);
  });

  it('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2022-12-10 16:00');
    const endsAt = getFutureDate('2022-12-10 15:00');

    expect(() =>
      makeAppointment({
        startsAt,
        endsAt,
      }),
    ).toThrow();
  });

  it('cannot create an appointment with start date before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() =>
      makeAppointment({
        startsAt,
        endsAt,
      }),
    ).toThrow();
  });
});
