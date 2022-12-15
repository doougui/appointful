import { AppointmentsRepository } from '../../../../application/repositories/appointments-repository';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create() {
    throw new Error('Not implemented');
  }

  async findOverlappingAppointment() {
    return null;
  }
}
