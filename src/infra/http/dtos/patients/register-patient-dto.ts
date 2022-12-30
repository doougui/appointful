import { PatientHttpViewModel } from '@infra/http/view-models/patient-view-model';

export type RegisterPatientInputDTO = {
  name: string;
  email: string;
  phone: string;
};

export type RegisterPatientOutputDTO = PatientHttpViewModel | undefined;
