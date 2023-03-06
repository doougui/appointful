import { describe, expect, it } from 'vitest';
import { getPastDate } from './get-past-date';

describe('getPastDate', () => {
  it('decreases date by one year', () => {
    const date = getPastDate();

    const expectedDate = new Date();
    expectedDate.setFullYear(expectedDate.getFullYear() - 1);

    expect(date).toStrictEqual(expectedDate);
  });
});
