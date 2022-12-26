import { AppointmentHttpViewModel } from '../view-models/appointment-view-model';

export interface ScheduleAppointmentInputDTO {
  patientId: string;
  dentistId: string;
  startsAt: string;
  endsAt: string;
}

export type ScheduleAppointmentOutputDTO = AppointmentHttpViewModel;
