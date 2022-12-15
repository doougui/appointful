import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CreateAppointment } from '../../../application/use-cases/create-appointment';
import { httpContainer } from '../container';

@injectable()
export class AppointmentsController {
  create(_: Request, res: Response) {
    return res.status(201).send();
  }

  index(_: Request, res: Response) {
    const createAppointmentUseCase = httpContainer.resolve(CreateAppointment);
    console.log(createAppointmentUseCase.execute);

    return res.json({ hello: 'world' }).end();
  }
}
