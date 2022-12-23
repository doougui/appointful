import { Dentist as DentistEntity } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { Dentist } from '@prisma/client';

export class PrismaDentistMapper {
  static toDomain(dentist: Dentist) {
    return new DentistEntity({
      name: dentist.name,
      email: new Email(dentist.email),
      createdAt: dentist.createdAt,
    });
  }
}
