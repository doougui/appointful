import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const startsAt = getFutureDate('2022-12-10')
    const endsAt = getFutureDate('2022-12-11')

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-12-10')
    const endsAt = getFutureDate('2022-12-15')

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-12-14'),
      endsAt: getFutureDate('2022-12-18')
    })).rejects.toBeInstanceOf(Error)

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-12-08'),
      endsAt: getFutureDate('2022-12-12')
    })).rejects.toBeInstanceOf(Error)

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-12-08'),
      endsAt: getFutureDate('2022-12-17')
    })).rejects.toBeInstanceOf(Error)

    await expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2022-12-11'),
      endsAt: getFutureDate('2022-12-12')
    })).rejects.toBeInstanceOf(Error)
  })
})
