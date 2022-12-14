import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const createAppointment = new CreateAppointment()

    const startsAt = getFutureDate('2022-12-10')
    const endsAt = getFutureDate('2022-12-11')

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
})
