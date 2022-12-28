import { DentistHttpViewModel } from '@infra/http/view-models/dentist-view-model';

export type GetDentistsInputDTO = Record<never, never>;

export type GetDentistsOutputDTO = DentistHttpViewModel[];
