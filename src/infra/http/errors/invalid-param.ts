export class InvalidParamError extends Error {
  constructor(message: string) {
    super(message ?? 'The provided param is invalid.');
  }
}
