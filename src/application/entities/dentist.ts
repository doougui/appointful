import { BaseEntity, EntityInput, Id } from './base-entity';
import { Email } from './value-objects/email';
import { Password } from './value-objects/password';

export interface DentistProps {
  name: string;
  email: Email;
  password: Password;
}

export class Dentist extends BaseEntity<DentistProps> {
  constructor(props: EntityInput<DentistProps>, id?: Id) {
    super(props, id);
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: Password) {
    this.props.password = password;
  }
}
