import { hashSync } from 'bcrypt';

export class Password {
  private readonly password: string;

  get value() {
    return this.password;
  }

  private hashPassword(password: string) {
    return hashSync(password, 10);
  }

  constructor(password: string) {
    this.password = this.hashPassword(password);
  }
}
