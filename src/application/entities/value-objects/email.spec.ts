import { describe, expect, it } from 'vitest';
import { InvalidEmailError } from '../errors/invalid-email-error';
import { Email } from './email';

describe('Email', () => {
  it('creates the email', () => {
    const email = new Email('test@test.com');

    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe('test@test.com');
  });

  it('throws an invalid email error', () => {
    expect(() => new Email('fake-email')).toThrow(InvalidEmailError);
  });
});
