import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Get dentists', () => {
  it('should be able to fetch a list of dentists', async () => {
    await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    await request(app).post('/dentists').send({
      name: 'Alícia Sara da Mata',
      email: 'alicia_sara_damata@simsvale.com.br',
    });

    const response = await request(app).get('/dentists').send();

    expect(response.statusCode).toBe(200);
    expect(response.body.dentists).toHaveLength(2);
    expect(response.body.dentists).toEqual([
      expect.objectContaining({
        name: 'Emilly Débora da Paz',
      }),
      expect.objectContaining({
        name: 'Alícia Sara da Mata',
      }),
    ]);
  });
});
