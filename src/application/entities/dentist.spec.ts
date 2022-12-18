import { makeDentist } from '@tests/factories/dentist-factory';
import { describe, expect, it } from 'vitest';
import { Dentist } from './dentist';

describe('Dentist', () => {
  it('creates an dentist', () => {
    const dentist = makeDentist();

    expect(dentist).toBeInstanceOf(Dentist);
    expect(dentist.name).toEqual('Example dentist');
  });
});
