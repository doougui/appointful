export class RequestError extends Error {
  constructor(message: string) {
    super(message ?? 'The provided data is invalid.');
  }
}
