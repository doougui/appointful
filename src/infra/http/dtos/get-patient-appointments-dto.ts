import { AppointmentHttpViewModel } from '../view-models/appointment-view-model';

export interface GetPatientAppointmentsInputDTO {
  patientId: string;
}

export type GetPatientAppointmentsOutputDTO = AppointmentHttpViewModel[];
