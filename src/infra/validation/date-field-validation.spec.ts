import { describe, expect, it } from 'vitest';
import { DateFieldValidation } from './date-field-validation';
import { ValidationError } from './errors/validation-error';

describe('DateFieldValidation', () => {
  const data = {
    field1: '2022-12-30 09:00:00',
  };

  const validator = new DateFieldValidation('field1');

  it('should return no errors if field is date', () => {
    const error = validator.validate(data);
    expect(error).toBeNull();
  });

  it('should return errors if field is not date', () => {
    const error = validator.validate({ field1: 'invalid-date' });
    expect(error).toBeInstanceOf(ValidationError);
  });
});
