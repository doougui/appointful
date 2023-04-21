import { BaseEntity } from './base-entity';
import { Email } from './value-objects/email';

export interface DentistProps {
  name: string;
  email: Email;
}

export class Dentist extends BaseEntity<DentistProps> {
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
}
