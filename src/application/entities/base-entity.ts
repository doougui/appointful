import { v4 as uuidv4 } from 'uuid';

export interface BaseProps {
  createdAt: Date;
  updatedAt: Date;
}

export type InputBaseProps = { createdAt?: Date; updatedAt?: Date };

export class BaseEntity<PropTypes> {
  private readonly _id: string;
  protected props: PropTypes & BaseProps;

  constructor(props: PropTypes & InputBaseProps, id?: string) {
    this._id = id ?? uuidv4();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
