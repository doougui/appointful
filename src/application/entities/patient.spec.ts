import { describe, expect, it } from 'vitest';
import { Patient } from './patient';
import { Email } from './value-objects/email';

describe('Patient', () => {
  it('creates an patient', () => {
    const patient = new Patient({
      name: 'Example patient',
      email: new Email('test@example.com'),
      phone: '+999999999999',
    });

    expect(patient).toBeInstanceOf(Patient);
    expect(patient.name).toEqual('Example patient');
  });
});
