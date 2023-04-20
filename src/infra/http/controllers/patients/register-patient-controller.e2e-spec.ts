import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Register patient', () => {
  it('should be able to register a new patient', async () => {
    const response = await request(app).post('/patients').send({
      name: 'Oliver Rodrigo Bernardes',
      email: 'oliver-bernardes71@keffin.com.br',
      phone: '+55 55 55555-5555',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Oliver Rodrigo Bernardes',
        email: 'oliver-bernardes71@keffin.com.br',
        phone: '+55 55 55555-5555',
      }),
    );
  });

  it('should not be able to register a patient that already exists', async () => {
    await request(app).post('/patients').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
      phone: '+55 55 55555-5555',
    });

    const response = await request(app).post('/patients').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
      phone: '+55 55 55555-5555',
    });

    expect(response.statusCode).toBe(400);
  });
});
