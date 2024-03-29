import validator from 'validator';
import { InvalidEmailError } from '../errors/invalid-email-error';

export class Email {
  private readonly email: string;

  get value() {
    return this.email;
  }

  private validateEmail(email: string) {
    return validator.isEmail(email);
  }

  constructor(email: string) {
    const isEmailValid = this.validateEmail(email);

    if (!isEmailValid) {
      throw new InvalidEmailError();
    }

    this.email = email;
  }
}
