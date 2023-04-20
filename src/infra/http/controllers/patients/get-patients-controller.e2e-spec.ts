import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Get patients', () => {
  it('should be able to fetch a list of patients', async () => {
    await request(app).post('/patients').send({
      name: 'Oliver Rodrigo Bernardes',
      email: 'oliver-bernardes71@keffin.com.br',
      phone: '+55 55 55555-5555',
    });

    await request(app).post('/patients').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
      phone: '+55 55 55555-5555',
    });

    const response = await request(app).get('/patients').send();

    expect(response.statusCode).toBe(200);
    expect(response.body.patients).toHaveLength(2);
    expect(response.body.patients).toEqual([
      expect.objectContaining({
        name: 'Oliver Rodrigo Bernardes',
      }),
      expect.objectContaining({
        name: 'Emilly Débora da Paz',
      }),
    ]);
  });
});
