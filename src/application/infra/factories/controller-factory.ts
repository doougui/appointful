import { InputError } from 'src/errors/input-error';
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

    if (e instanceof InputError) {
      return clientError(e);
    }

    return fail(e);
  }
}
