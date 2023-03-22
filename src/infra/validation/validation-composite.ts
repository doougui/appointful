import { Validator } from '@application/infra/validator';
import { ValidationError } from './errors/validation-error';

export class ValidationComposite<T> implements Validator<T> {
  constructor(private readonly validators: Validator<T>[]) {}

  validate(input: T): ValidationError | null {
    for (const validator of this.validators) {
      const error = validator.validate(input);
      if (error !== null) return error;
    }

    return null;
  }
}
