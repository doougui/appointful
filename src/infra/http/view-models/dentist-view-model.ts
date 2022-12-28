import { Dentist } from '@application/entities/dentist';

export type DentistHttpViewModel = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export class DentistViewModel {
  static toHTTP(dentist: Dentist): DentistHttpViewModel {
    return {
      id: dentist.id,
      name: dentist.name,
      email: dentist.email.value,
      createdAt: dentist.createdAt,
    };
  }
}
