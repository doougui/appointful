import { Replace } from '@helpers/Replace';
import { randomUUID } from 'crypto';

export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private _id: string;
  private props: AppointmentProps;

  constructor(
    props: Replace<AppointmentProps, { createdAt?: Date }>,
    id?: string,
  ) {
    const { startsAt, endsAt } = props;

    /**
     * id with _ so it doesn't conflict with getter name (id)
     */
    this._id = id ?? randomUUID();

    if (startsAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get customer() {
    return this.props.customer;
  }

  public set customer(customer: string) {
    this.props.customer = customer;
  }

  public get startsAt() {
    return this.props.startsAt;
  }

  public set startsAt(startsAt: Date) {
    this.props.startsAt = startsAt;
  }

  public get endsAt() {
    return this.props.endsAt;
  }

  public set endsAt(endsAt: Date) {
    this.props.endsAt = endsAt;
  }
}
