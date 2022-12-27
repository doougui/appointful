import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { DentistsRepository } from '@application/repositories/dentists-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { makeDentist } from '@tests/factories/dentist-factory';
import { makePatient } from '@tests/factories/patient-factory';
import { InMemoryAppointmentsRepository } from '@tests/repositories/in-memory-appointments-repository';
import { InMemoryDentistsRepository } from '@tests/repositories/in-memory-dentists-repository';
import { InMemoryPatientsRepository } from '@tests/repositories/in-memory-patients-repository';
import { getFutureDate } from '@tests/utils/get-future-date';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { InvalidDentistError } from './errors/invalid-dentist';
import { InvalidEndDateError } from './errors/invalid-end-date';
import { InvalidPatientError } from './errors/invalid-patient';
import { InvalidStartDateError } from './errors/invalid-start-date';
import { ScheduleAppointment } from './schedule-appointment';

let appointmentsRepository: AppointmentsRepository;
let patientsRepository: PatientsRepository;
let dentistsRepository: DentistsRepository;
let scheduleAppointment: ScheduleAppointment;

describe('ScheduleAppointment', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository();
    patientsRepository = new InMemoryPatientsRepository();
    dentistsRepository = new InMemoryDentistsRepository();

    scheduleAppointment = new ScheduleAppointment(
      appointmentsRepository,
      patientsRepository,
      dentistsRepository,
    );
  });

  it('should be able to schedule an appointment', async () => {
    const startsAt = getFutureDate('2022-12-10 09:00');
    const endsAt = getFutureDate('2022-12-11 12:00');

    const patient = makePatient();
    await patientsRepository.create(patient);

    const dentist = makeDentist();
    await dentistsRepository.create(dentist);

    const { appointment } = await scheduleAppointment.execute({
      patientId: patient.id,
      dentistId: dentist.id,
      startsAt,
      endsAt,
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });

  it('should not be able to schedule an appointment with start date before now', async () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    const patient = makePatient();
    await patientsRepository.create(patient);

    const dentist = makeDentist();
    await dentistsRepository.create(dentist);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt,
        endsAt,
      }),
    ).rejects.toBeInstanceOf(InvalidStartDateError);
  });

  it('cannot create an appointment with end date before start date', async () => {
    const startsAt = getFutureDate('2022-12-10 16:00');
    const endsAt = getFutureDate('2022-12-10 15:00');

    const patient = makePatient();
    await patientsRepository.create(patient);

    const dentist = makeDentist();
    await dentistsRepository.create(dentist);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt,
        endsAt,
      }),
    ).rejects.toBeInstanceOf(InvalidEndDateError);
  });

  it('should not be able to schedule an appointment with a non existing patient', async () => {
    const dentist = makeDentist();
    await dentistsRepository.create(dentist);

    await expect(
      scheduleAppointment.execute({
        patientId: 'fake-patient',
        dentistId: dentist.id,
        startsAt: getFutureDate('2022-12-10 09:00'),
        endsAt: getFutureDate('2022-12-11 12:00'),
      }),
    ).rejects.toBeInstanceOf(InvalidPatientError);
  });

  it('should not be able to schedule an appointment with a non existing dentist', async () => {
    const patient = makePatient();
    await patientsRepository.create(patient);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: 'fake-dentist',
        startsAt: getFutureDate('2022-12-10 09:00'),
        endsAt: getFutureDate('2022-12-11 12:00'),
      }),
    ).rejects.toBeInstanceOf(InvalidDentistError);
  });

  it('should not be able to schedule an appointment with overlapping dates', async () => {
    const date = '2022-12-10';

    const startsAt = getFutureDate(`${date} 09:00`);
    const endsAt = getFutureDate(`${date} 12:00`);

    const patient = makePatient();
    await patientsRepository.create(patient);

    const dentist = makeDentist({}, 'dentist-1');
    await dentistsRepository.create(dentist);

    await scheduleAppointment.execute({
      patientId: patient.id,
      dentistId: dentist.id,
      startsAt,
      endsAt,
    });

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt: getFutureDate(`${date} 11:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 14:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt: getFutureDate(`${date} 08:00`),
        endsAt: getFutureDate(`${date} 15:00`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    await expect(
      scheduleAppointment.execute({
        patientId: patient.id,
        dentistId: dentist.id,
        startsAt: getFutureDate(`${date} 09:30`),
        endsAt: getFutureDate(`${date} 11:30`),
      }),
    ).rejects.toBeInstanceOf(AppointmentWithOverlappingDates);

    const dentist2 = makeDentist({}, 'dentist-2');
    await dentistsRepository.create(dentist2);

    const { appointment } = await scheduleAppointment.execute({
      patientId: patient.id,
      dentistId: dentist2.id,
      startsAt: getFutureDate(`${date} 09:30`),
      endsAt: getFutureDate(`${date} 11:30`),
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });

  it('should be able to schedule an appointment at the same time with different dentists', async () => {
    const date = '2022-12-10';

    const startsAt = getFutureDate(`${date} 09:00`);
    const endsAt = getFutureDate(`${date} 12:00`);

    const patient = makePatient();
    await patientsRepository.create(patient);

    const dentist1 = makeDentist({}, 'dentist-1');
    await dentistsRepository.create(dentist1);

    const dentist2 = makeDentist({}, 'dentist-2');
    await dentistsRepository.create(dentist2);

    await scheduleAppointment.execute({
      patientId: patient.id,
      dentistId: dentist1.id,
      startsAt,
      endsAt,
    });

    const { appointment } = await scheduleAppointment.execute({
      patientId: patient.id,
      dentistId: dentist2.id,
      startsAt: getFutureDate(`${date} 09:00`),
      endsAt: getFutureDate(`${date} 12:00`),
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });
});
