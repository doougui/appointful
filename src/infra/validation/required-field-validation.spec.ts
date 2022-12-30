import { describe, expect, it } from 'vitest';
import { ValidationError } from './errors/validation-error';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  const data = {
    field1: '1234',
  };

  const validator = new RequiredFieldValidation('field1');

  it('should return no errors if required field is present', () => {
    const error = validator.validate(data);
    expect(error).toBeNull();
  });

  it('should return error if required field is not present', () => {
    const error = validator.validate({ field1: '' });
    expect(error).toBeInstanceOf(ValidationError);
  });
});
