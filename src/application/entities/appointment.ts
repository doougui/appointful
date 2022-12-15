export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private readonly props: AppointmentProps;

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

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    this.props = props;
  }
}
