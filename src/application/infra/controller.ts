import { HttpResponse } from './http-response';

export interface Controller<T, R = undefined> {
  handle: (request: T) => Promise<HttpResponse<R>>;
}
