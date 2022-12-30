import { Validator } from '@application/infra/validator';
import { InvalidEmailError } from './errors/invalid-email-error';
import { EmailValidator } from './protocols/email-validations';

export class EmailFieldValidation<T> implements Validator<T> {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: T) {
    const isValid = this.emailValidator.isValid(
      input[this.fieldName as keyof T] as string,
    );

    if (!isValid) {
      return new InvalidEmailError();
    }

    return null;
  }
}
