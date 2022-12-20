import { makeAppointment } from '@tests/factories/appointment-factory';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { describe, expect, it } from 'vitest';
import { CancelAppointment } from './cancel-appointment';
import { AppointmentNotFound } from './errors/appointment-not-found';

describe('CancelAppointment', () => {
  it('should be able to cancel an appointment', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const cancelAppointment = new CancelAppointment(appointmentsRepository);

    const appointment = makeAppointment();

    await appointmentsRepository.create(appointment);

    await cancelAppointment.execute({ appointmentId: appointment.id });

    expect(appointmentsRepository.appointments[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing appointment', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const cancelAppointment = new CancelAppointment(appointmentsRepository);

    await expect(() => {
      return cancelAppointment.execute({
        appointmentId: 'fake-appointment-id',
      });
    }).rejects.toThrow(AppointmentNotFound);
  });
});
