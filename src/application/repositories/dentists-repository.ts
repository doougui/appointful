import { Dentist } from '@application/entities/dentist';

export interface DentistsRepository {
  findById: (dentistId: string) => Promise<Dentist | null>;
  create: (dentist: Dentist) => Promise<void>;
  save: (dentist: Dentist) => Promise<void>;
}
