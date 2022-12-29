import { makeDentist } from '@tests/factories/dentist-factory';
import { InMemoryDentistsRepository } from '@tests/repositories/in-memory-dentists-repository';
import { describe, expect, it } from 'vitest';
import { DentistNotFound } from './errors/dentist-not-found';
import { RemoveDentist } from './remove-dentist';

describe('RemoveDentist', () => {
  it('should remove the dentist', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const removeDentist = new RemoveDentist(dentistsRepository);

    await dentistsRepository.create(makeDentist({}, 'dentist-1'));
    await dentistsRepository.create(makeDentist({}, 'dentist-2'));
    await dentistsRepository.create(makeDentist({}, 'dentist-3'));

    expect(dentistsRepository.dentists).toHaveLength(3);

    await removeDentist.execute({ dentistId: 'dentist-1' });

    expect(dentistsRepository.dentists).toHaveLength(2);
    expect(
      dentistsRepository.dentists.find((item) => item.id === 'dentist-1'),
    ).toBeUndefined();
  });

  it('should throw an error if dentist does not exist', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const removeDentist = new RemoveDentist(dentistsRepository);

    await dentistsRepository.create(makeDentist({}, 'dentist-1'));
    await dentistsRepository.create(makeDentist({}, 'dentist-2'));
    await dentistsRepository.create(makeDentist({}, 'dentist-3'));

    expect(
      removeDentist.execute({ dentistId: 'non-existent-dentist' }),
    ).rejects.toThrow(DentistNotFound);
  });
});
