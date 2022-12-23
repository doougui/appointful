import { v4 as uuidv4 } from 'uuid';

export interface BaseProps {
  createdAt: Date;
}

export type EntityInput<T> = T & { createdAt?: Date };
export type Id = string;

export class BaseEntity<PropTypes> {
  private readonly _id: Id;
  protected props: PropTypes & BaseProps;

  constructor(props: EntityInput<PropTypes>, id?: Id) {
    this._id = id ?? uuidv4();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
