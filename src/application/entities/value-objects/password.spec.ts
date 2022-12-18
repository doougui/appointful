import { describe, expect, it } from 'vitest';
import { Password } from './password';
import { compareSync } from 'bcrypt';

describe('Password', () => {
  it('hashes the password', () => {
    const password = new Password('12345');

    expect(password).toBeInstanceOf(Password);
    expect(password.value).not.toBe('12345');
    expect(compareSync('12345', password.value)).toBe(true);
  });
});
