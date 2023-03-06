import { makeAppointment } from '@tests/factories/appointment-factory';
import { getPastDate } from '@tests/utils/get-past-date';
import { describe, expect, it } from 'vitest';
import { Appointment } from './appointment';
import { UncancelableAppointment } from './errors/uncancelable-appointment-error';

describe('Appointment', () => {
  it('creates an appointment', () => {
    const appointment = makeAppointment();
    expect(appointment).toBeInstanceOf(Appointment);
  });

  it('cancels an appointment', () => {
    const appointment = makeAppointment();

    expect(appointment.canceledAt).toBeUndefined();

    appointment.cancel();
    expect(appointment.canceledAt).toStrictEqual(new Date());
  });

  it('should not be able to cancel an appointment that is in the past', () => {
    const appointment = makeAppointment({
      startsAt: getPastDate(),
      endsAt: getPastDate(),
    });

    expect(appointment.canceledAt).toBeUndefined();

    expect(() => appointment.cancel()).toThrow(UncancelableAppointment);
  });
});
