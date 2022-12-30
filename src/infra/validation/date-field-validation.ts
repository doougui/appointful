import { Validator } from '@application/infra/validator';
import { isValidDate } from '@utils/is-valid-date';
import { parseISO } from 'date-fns';
import { InvalidDateError } from './errors/invalid-date-error';

export class DateFieldValidation<T> implements Validator<T> {
  constructor(private readonly fieldName: string) {}

  validate(input: T) {
    const field = input[this.fieldName as keyof T];
    const date = parseISO(field as string);

    if (!isValidDate(date)) {
      return new InvalidDateError(this.fieldName);
    }

    return null;
  }
}
