import { EmailValidatorAdapter } from '@application/infra/adapters/email-validation-adapter';
import { describe, expect, it } from 'vitest';
import { EmailFieldValidation } from './email-field-validation';
import { ValidationError } from './errors/validation-error';

describe('EmailFieldValidation', () => {
  const data = {
    field1: 'test@test.com',
  };

  const validator = new EmailFieldValidation(
    'field1',
    new EmailValidatorAdapter(),
  );

  it('should return no errors if field is email', () => {
    const error = validator.validate(data);
    expect(error).toBeNull();
  });

  it('should return errors if field is not email', () => {
    const error = validator.validate({ field1: 'invalid-email' });
    expect(error).toBeInstanceOf(ValidationError);
  });
});
