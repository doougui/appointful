import { app } from '@infra/http/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Remove patient', () => {
  it('should be able to remove a patient', async () => {
    const patientResponse = await request(app).post('/patients').send({
      name: 'Oliver Rodrigo Bernardes',
      email: 'oliver-bernardes71@keffin.com.br',
      phone: '+55 55 55555-5555',
    });

    const response = await request(app).delete(
      `/patients/${patientResponse.body.id}`,
    );

    expect(response.statusCode).toBe(204);
  });

  it('should not be able to delete a non-existing patient', async () => {
    const response = await request(app).delete(
      `/patients/non-existing-patient`,
    );

    expect(response.statusCode).toBe(400);
  });
});
