import { Validator } from '@application/infra/validator';
import { MissingParamError } from './errors/missing-param-error';

export class RequiredFieldValidation<T> implements Validator<T> {
  constructor(private readonly fieldName: string) {}

  validate(input: T) {
    if (!input[this.fieldName as keyof T]) {
      return new MissingParamError(this.fieldName);
    }

    return null;
  }
}
