import { AppointmentsRepository } from '@application/repositories/appointments-repository';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async findById() {
    return null;
  }

  async findManyByPatientId() {
    return [];
  }

  async findOverlappingAppointment() {
    return null;
  }

  async save() {
    throw new Error('Method not implemented.');
  }

  async create() {
    throw new Error('Method not implemented.');
  }
}
