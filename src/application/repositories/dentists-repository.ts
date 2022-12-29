import { Dentist } from '@application/entities/dentist';

export interface DentistsRepository {
  findAll: () => Promise<Dentist[]>;
  findById: (dentistId: string) => Promise<Dentist | null>;
  findByEmail: (email: string) => Promise<Dentist | null>;
  delete: (dentistId: string) => Promise<void>;
  create: (dentist: Dentist) => Promise<void>;
  save: (dentist: Dentist) => Promise<void>;
}
