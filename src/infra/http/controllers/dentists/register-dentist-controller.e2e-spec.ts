import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Register dentist', () => {
  it('should be able to register a new dentist', async () => {
    const response = await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Emilly Débora da Paz',
        email: 'emilly.debora.dapaz@bool.com.br',
      }),
    );
  });

  it('should not be able to register a dentist that already exists', async () => {
    await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    const response = await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    expect(response.statusCode).toBe(400);
  });
});
