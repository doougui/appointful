import { app } from '@infra/http/app';
import { getFutureDate } from '@tests/utils/get-future-date';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('Get patient appointments', () => {
  it('should be able to fetch a list of patient appointments', async () => {
    const dentistResponse = await request(app).post('/dentists').send({
      name: 'Emilly Débora da Paz',
      email: 'emilly.debora.dapaz@bool.com.br',
    });

    const patientResponse = await request(app).post('/patients').send({
      name: 'Oliver Rodrigo Bernardes',
      email: 'oliver-bernardes71@keffin.com.br',
      phone: '+55 55 55555-5555',
    });

    await request(app)
      .post('/appointments/schedule')
      .send({
        dentistId: dentistResponse.body.id,
        patientId: patientResponse.body.id,
        startsAt: getFutureDate('2022-12-10 09:00'),
        endsAt: getFutureDate('2022-12-11 12:00'),
      });

    const response = await request(app)
      .get(`/appointments/patient/${patientResponse.body.id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.appointments).toHaveLength(1);
    expect(response.body.appointments).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });
});
