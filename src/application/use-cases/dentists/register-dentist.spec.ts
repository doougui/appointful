import { Dentist } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { makeDentist } from '@tests/factories/dentist-factory';
import { InMemoryDentistsRepository } from '@tests/repositories/in-memory-dentists-repository';
import { describe, expect, it } from 'vitest';
import { RegisterDentist } from './register-dentist';
import { DentistAlreadyExists } from './errors/dentist-already-exists';

describe('RegisterDentist', () => {
  it('should register a dentist', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const registerDentist = new RegisterDentist(dentistsRepository);

    const { dentist } = await registerDentist.execute({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    expect(dentist).toBeInstanceOf(Dentist);
    expect(dentistsRepository.dentists[0].name).toBe('John Doe');
  });

  it('should not be able to register a dentist that already exists', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const registerDentist = new RegisterDentist(dentistsRepository);

    const dentist = makeDentist({
      email: new Email('existing@email.com'),
    });
    await dentistsRepository.create(dentist);

    expect(
      registerDentist.execute({
        name: 'John Doe',
        email: 'existing@email.com',
      }),
    ).rejects.toBeInstanceOf(DentistAlreadyExists);
  });
});
