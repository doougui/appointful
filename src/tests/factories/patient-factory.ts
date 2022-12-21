import { Id } from '@application/entities/base-entity';
import { Patient, PatientProps } from '@application/entities/patient';
import { Email } from '@application/entities/value-objects/email';

type Override = Partial<PatientProps>;

export function makePatient(override: Override = {}, id?: Id) {
  return new Patient(
    {
      name: 'Example patient',
      email: new Email('test@example.com'),
      phone: '+999999999999',
      ...override,
    },
    id,
  );
}
