import { Appointment } from '@application/entities/appointment';
import { AppointmentsRepository } from '@application/repositories/appointments-repository';
import { DentistsRepository } from '@application/repositories/dentists-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { AppointmentWithOverlappingDates } from './errors/appointment-with-overlapping-dates';
import { InvalidDentistError } from './errors/invalid-dentist';
import { InvalidEndDateError } from './errors/invalid-end-date';
import { InvalidPatientError } from './errors/invalid-patient';
import { InvalidStartDateError } from './errors/invalid-start-date';

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

  private async validate({
    patientId,
    dentistId,
    startsAt,
    endsAt,
  }: ScheduleAppointmentRequest) {
    if (startsAt <= new Date()) {
      throw new InvalidStartDateError();
    }

    if (endsAt <= startsAt) {
      throw new InvalidEndDateError();
    }

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
  }

  async execute(
    request: ScheduleAppointmentRequest,
  ): Promise<ScheduleAppointmentResponse> {
    await this.validate(request);

    const { patientId, dentistId, startsAt, endsAt } = request;

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
