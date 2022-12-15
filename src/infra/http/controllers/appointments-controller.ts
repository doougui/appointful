import { Request, Response } from 'express';

export class AppointmentsController {
  index(_: Request, res: Response) {
    return res.json({ hello: 'world' });
  }
}
