import { BaseEntity, EntityInput, Id } from './base-entity';
import { Dentist } from './dentist';
import { Patient } from './patient';

export interface AppointmentProps {
  patient: Patient;
  dentist: Dentist;
  startsAt: Date;
  endsAt: Date;
  canceledAt?: Date | null;
}

export class Appointment extends BaseEntity<AppointmentProps> {
  constructor(props: EntityInput<AppointmentProps>, id?: Id) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('Invalid start date');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    super(props, id);
  }

  public get patient() {
    return this.props.patient;
  }

  public set patient(patient: Patient) {
    this.props.patient = patient;
  }

  public get dentist() {
    return this.props.dentist;
  }

  public set dentist(dentist: Dentist) {
    this.props.dentist = dentist;
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
