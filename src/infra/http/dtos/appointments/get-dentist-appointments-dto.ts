import { AppointmentHttpViewModel } from '../../view-models/appointment-view-model';

export interface GetDentistAppointmentsInputDTO {
  dentistId: string;
}

export type GetDentistAppointmentsOutputDTO = {
  appointments: AppointmentHttpViewModel[];
};
