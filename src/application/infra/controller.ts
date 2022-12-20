import { HttpResponse } from './http-response';

export interface Controller<T> {
  handle: (request: T) => Promise<HttpResponse>;
}
