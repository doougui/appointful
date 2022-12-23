import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { DentistsRepository } from '@application/repositories/dentists-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { InvalidDentistError } from './errors/invalid-dentist';
import { InvalidPatientError } from './errors/invalid-patient';

interface ScheduleAppointmentRequest {
  patientId: string;
  dentistId: string;
  startsAt: Date;
  endsAt: Date;
}

type ScheduleAppointmentResponse = { appointment: Appointment };

export class ScheduleAppointment {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private patientsRepository: PatientsRepository,
    private dentistsRepository: DentistsRepository,
  ) {}

  async execute({
    patientId,
    dentistId,
    startsAt,
    endsAt,
  }: ScheduleAppointmentRequest): Promise<ScheduleAppointmentResponse> {
    const patient = await this.patientsRepository.findById(patientId);

    if (!patient) {
      throw new InvalidPatientError();
    }

    const dentist = await this.dentistsRepository.findById(dentistId);

    if (!dentist) {
      throw new InvalidDentistError();
    }

    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
        dentist,
      );

    if (overlappingAppointment) {
      throw new AppointmentWithOverlappingDates();
    }

    const appointment = new Appointment({
      patientId,
      dentistId,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return { appointment };
  }
}
