import { makeAppointment } from '@tests/factories/appointment-factory';
import { describe, expect, it } from 'vitest';
import { Appointment } from './appointment';

describe('Appointment', () => {
  it('creates an appointment', () => {
    const appointment = makeAppointment();
    expect(appointment).toBeInstanceOf(Appointment);
  });
});
