import { PrismaAppointmentsRepository } from '../../database/prisma/repositories/prisma-appointments-repository';
import { httpContainer } from '.';

httpContainer.register('AppointmentsRepository', {
  useClass: PrismaAppointmentsRepository,
});
