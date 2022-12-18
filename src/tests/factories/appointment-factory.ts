import {
  Appointment,
  AppointmentProps,
} from '@application/entities/appointment';
import { getFutureDate } from '@tests/utils/get-future-date';
import { makeDentist } from './dentist-factory';
import { makePatient } from './patient-factory';

type Override = Partial<AppointmentProps>;

export function makeAppointment(override: Override = {}) {
  return new Appointment({
    dentist: makeDentist(),
    patient: makePatient(),
    startsAt: getFutureDate('2022-12-10 13:00'),
    endsAt: getFutureDate('2022-12-10 16:00'),
    ...override,
  });
}
