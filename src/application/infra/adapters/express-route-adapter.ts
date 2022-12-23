import { Request, Response } from 'express';
import { Controller } from '../controller';
import { makeController } from '../factories/controller-factory';

export function adaptRoute<T, R>(controller: Controller<T, R>) {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
    };

    const httpResponse = await makeController<T, R>(controller, requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }

    return response.status(httpResponse.statusCode).json({
      error:
        (httpResponse.body as { error: string })?.error ?? 'Unexpected error.',
    });
  };
}
