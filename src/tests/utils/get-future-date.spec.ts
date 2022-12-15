import { describe, expect, it } from 'vitest';
import { getFutureDate } from './get-future-date';

describe('getFutureDate', () => {
  it('increases date by one year', () => {
    const year = new Date().getFullYear();
    expect(getFutureDate(`${year}-12-13`).getFullYear()).toEqual(year + 1);
  });
});
