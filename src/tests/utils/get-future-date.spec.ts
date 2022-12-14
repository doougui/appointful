import { expect, test } from 'vitest'
import { getFutureDate } from './get-future-date'

test('increases date by one year', () => {
  const year = new Date().getFullYear()
  expect(getFutureDate(`${year}-12-13`).getFullYear()).toEqual(year + 1)
})
