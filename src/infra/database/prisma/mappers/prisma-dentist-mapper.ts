import { Dentist as DentistEntity } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { Dentist } from '@prisma/client';

export class PrismaDentistMapper {
  static toPrisma(dentist: DentistEntity) {
    return {
      id: dentist.id,
      name: dentist.name,
      email: dentist.email.value,
      createdAt: dentist.createdAt,
    };
  }

  static toDomain(dentist: Dentist) {
    return new DentistEntity(
      {
        name: dentist.name,
        email: new Email(dentist.email),
        createdAt: dentist.createdAt,
      },
      dentist.id,
    );
  }
}
