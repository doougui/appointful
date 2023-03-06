export class InputError extends Error {
  constructor(message: string) {
    super(message ?? 'The provided data is invalid.');
  }
}
