import { InputError } from 'src/errors/input-error';

export class RequestError extends InputError {
  constructor(message: string) {
    super(message);
  }
}
