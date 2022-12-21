import { Request, Response } from 'express';
import { Controller } from '../controller';
import { makeController } from '../factories/controller-factory';

export function adaptRoute<T>(controller: Controller<T>) {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
    };

    const httpResponse = await makeController<T>(controller, requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body?.error ?? 'Unexpected error.',
    });
  };
}
