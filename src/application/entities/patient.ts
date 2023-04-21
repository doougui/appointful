import { BaseEntity } from './base-entity';
import { Email } from './value-objects/email';

export interface PatientProps {
  name: string;
  email: Email;
  phone: string;
}

export class Patient extends BaseEntity<PatientProps> {
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

  public get phone() {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }
}
