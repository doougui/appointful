import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appoint', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() + 1)

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('cannot create an appoint with end date before start date', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() - 1)

  expect(() => new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt
  })).toThrow()
})
