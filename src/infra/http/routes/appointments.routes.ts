import { adaptRoute } from '@application/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { makeCancelAppointmentController } from '../factories/controllers/appointments/cancel-appointments-controller-factory';
import { makeGetDentistAppointmentsController } from '../factories/controllers/appointments/get-dentist-appointments-controller-factory';
import { makeGetPatientAppointmentsController } from '../factories/controllers/appointments/get-patient-appointments-controller-factory copy';
import { makeScheduleAppointmentsController } from '../factories/controllers/appointments/schedule-appointments-controller-factory';

const appointmentsRoutes = Router();

appointmentsRoutes.post(
  '/schedule',
  adaptRoute(makeScheduleAppointmentsController()),
);

appointmentsRoutes.patch(
  '/cancel/:appointmentId',
  adaptRoute(makeCancelAppointmentController()),
);

appointmentsRoutes.get(
  '/dentist/:dentistId',
  adaptRoute(makeGetDentistAppointmentsController()),
);

appointmentsRoutes.get(
  '/patient/:patientId',
  adaptRoute(makeGetPatientAppointmentsController()),
);

export { appointmentsRoutes };
