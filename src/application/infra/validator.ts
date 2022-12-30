import { ValidationError } from '@infra/validation/errors/validation-error';

export interface Validator<T> {
  validate(data: T): ValidationError | null;
}
