import { describe, expect, it } from 'vitest';
import { ValidationError } from './errors/validation-error';
import { RequiredFieldValidation } from './required-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidatorComposite', () => {
  interface Fields {
    field1: string;
    field2: string;
    field3: string;
  }

  const validator = new ValidationComposite<Fields>([
    new RequiredFieldValidation('field1'),
    new RequiredFieldValidation('field2'),
    new RequiredFieldValidation('field3'),
  ]);

  const data: Fields = {
    field1: '1234',
    field2: '123456',
    field3: '12345678',
  };

  it('should return no errors if all validations pass', () => {
    const error = validator.validate(data);
    expect(error).toBeNull();
  });

  it('should return error if any validation returns error', () => {
    const error = validator.validate({ ...data, field1: '' });
    expect(error).toBeInstanceOf(ValidationError);
  });
});
