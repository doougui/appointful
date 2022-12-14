import { Appointment } from '../entities/appointment'

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  async execute ({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    return new Appointment({ customer, startsAt, endsAt })
  }
}
