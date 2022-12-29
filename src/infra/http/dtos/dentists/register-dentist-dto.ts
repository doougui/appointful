import { DentistHttpViewModel } from '@infra/http/view-models/dentist-view-model';

export type RegisterDentistInputDTO = {
  name: string;
  email: string;
};

export type RegisterDentistOutputDTO = DentistHttpViewModel;
