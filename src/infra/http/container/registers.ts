import { PrismaAppointmentsRepository } from '@infra/database/prisma/repositories/prisma-appointments-repository';
import { httpContainer } from '.';

httpContainer.register('AppointmentsRepository', {
  useClass: PrismaAppointmentsRepository,
});
