import { PatientHttpViewModel } from '@infra/http/view-models/patient-view-model';

export type GetPatientsInputDTO = Record<never, never>;

export type GetPatientsOutputDTO = {
  patients: PatientHttpViewModel[];
};
