import { Dentist, DentistProps } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { Password } from '@application/entities/value-objects/password';

type Override = Partial<DentistProps>;

export function makeDentist(override: Override = {}) {
  return new Dentist({
    name: 'Example dentist',
    email: new Email('test@example.com'),
    password: new Password('12345'),
    ...override,
  });
}
