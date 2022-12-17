import { AppointmentsRepository } from '@application/repositories/appointments-repository';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create() {
    throw new Error('Method not implemented.');
  }

  async findOverlappingAppointment() {
    throw new Error('Method not implemented.');
    return null;
  }
}
