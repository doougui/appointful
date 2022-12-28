import { makeDentist } from '@tests/factories/dentist-factory';
import { InMemoryDentistsRepository } from '@tests/repositories/in-memory-dentists-repository';
import { describe, expect, it } from 'vitest';
import { GetDentists } from './get-dentists';

describe('GetDentists', () => {
  it('should return dentists', async () => {
    const dentistsRepository = new InMemoryDentistsRepository();
    const getDentists = new GetDentists(dentistsRepository);

    dentistsRepository.create(makeDentist());
    dentistsRepository.create(makeDentist());
    dentistsRepository.create(makeDentist());

    const { dentists } = await getDentists.execute();

    expect(dentists).toHaveLength(3);
    expect(dentists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
