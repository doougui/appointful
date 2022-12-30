import { EmailValidator } from '@infra/validation/protocols/email-validations';
import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
