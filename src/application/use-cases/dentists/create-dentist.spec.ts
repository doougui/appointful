import { Dentist } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { makeDentist } from '@tests/factories/dentist-factory';
import { InMemoryDentistsRepository } from '@tests/repositories/in-memory-dentists-repository';
import { describe, expect, it } from 'vitest';
import { CreateDentist } from './create-dentist';
import { DentistAlreadyExists } from './errors/dentist-already-exists';

describe('CreateDentist', () => {
  it('should create a dentist', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const createDentist = new CreateDentist(dentistsRepository);

    const { dentist } = await createDentist.execute({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    expect(dentist).toBeInstanceOf(Dentist);
    expect(dentistsRepository.dentists[0].name).toBe('John Doe');
  });

  it('should not be able to create a dentist with existing email', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const createDentist = new CreateDentist(dentistsRepository);

    const dentist = makeDentist({
      email: new Email('existing@email.com'),
    });
    await dentistsRepository.create(dentist);

    expect(
      createDentist.execute({
        name: 'John Doe',
        email: 'existing@email.com',
      }),
    ).rejects.toBeInstanceOf(DentistAlreadyExists);
  });
});
