import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class AppointmentsController {
  create(_: Request, res: Response) {
    return res.status(201).send();
  }

  index(_: Request, res: Response) {
    // const createAppointmentUseCase = httpContainer.resolve(CreateAppointment);

    return res.json({ message: 'hello world' }).end();
  }
}
