import { RequestError } from '@infra/http/errors/request-error';
import { Controller } from '../controller';
import { clientError, fail } from '../http-response';

export async function makeController<T, R>(
  controller: Controller<T, R>,
  requestData: T,
) {
  try {
    return await controller.handle(requestData);
  } catch (e) {
    if (!(e instanceof Error)) return fail(e);

    if (e instanceof RequestError) {
      return clientError(e);
    }

    return fail(e);
  }
}
