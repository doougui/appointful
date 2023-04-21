import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Remove dentist', () => {
  it('should be able to remove a dentist', async () => {
    const dentistResponse = await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    const response = await request(app).delete(
      `/dentists/${dentistResponse.body.id}`,
    );

    expect(response.statusCode).toBe(204);
  });

  it('should not be able to delete a non-existing dentist', async () => {
    const response = await request(app).delete(
      `/dentists/non-existing-dentist`,
    );

    expect(response.statusCode).toBe(400);
  });
});
