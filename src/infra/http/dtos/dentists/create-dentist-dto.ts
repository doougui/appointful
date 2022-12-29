import { DentistHttpViewModel } from '@infra/http/view-models/dentist-view-model';

export type CreateDentistInputDTO = {
  name: string;
  email: string;
};

export type CreateDentistOutputDTO = DentistHttpViewModel;
