import { BaseEntity, EntityInput, Id } from './base-entity';

export interface AppointmentProps {
  patientId: string;
  dentistId: string;
  startsAt: Date;
  endsAt: Date;
  canceledAt?: Date | null;
}

export class Appointment extends BaseEntity<AppointmentProps> {
  constructor(props: EntityInput<AppointmentProps>, id?: Id) {
    // const { startsAt, endsAt } = props;

    // if (startsAt <= new Date()) {
    //   throw new RequestError(
    //     'Start date must be greater than the current date.',
    //   );
    // }

    // if (endsAt <= startsAt) {
    //   throw new RequestError('End date must be greater than the start date.');
    // }

    super(props, id);
  }

  public get patientId() {
    return this.props.patientId;
  }

  public set patientId(patient: string) {
    this.props.patientId = patient;
  }

  public get dentistId() {
    return this.props.dentistId;
  }

  public set dentistId(dentistId: string) {
    this.props.dentistId = dentistId;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
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

  public cancel() {
    this.props.canceledAt = new Date();
  }
}
