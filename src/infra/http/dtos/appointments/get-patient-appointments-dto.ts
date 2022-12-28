import { AppointmentHttpViewModel } from '@infra/http/view-models/appointment-view-model';

export interface GetPatientAppointmentsInputDTO {
  patientId: string;
}

export type GetPatientAppointmentsOutputDTO = AppointmentHttpViewModel[];
