import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import server from '../server.js';

describe('Campers API Integration Tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('GET /api/campers returns array of campers', async () => {
    const res = await request(app).get('/api/campers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/campers with invalid data returns 400', async () => {
    const invalidCamperData = {
      name: '',
      images: ['invalid-url'],
      sleepingCapacity: -1,
      price: -100,
      description: '',
      features: [],
    };

    const res = await request(app).post('/api/campers').send(invalidCamperData);
    expect(res.status).toBe(400);

    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/campers creates camper successfully', async () => {
    const camperData = {
      name: `Test Camper ${Date.now()}`,
      images: ['https://example.com/camper.jpg'],
      category: 'van',
      sleepingCapacity: 4,
      price: 25000,
      description: 'A camper for testing purposes',
      features: ['Solar panels', 'Extra battery'],
    };

    const res = await request(app)
      .post('/api/campers')
      .send(camperData)
      .expect(201);

    expect(res.body.name).toBe(camperData.name);
    expect(res.body.price).toBe(camperData.price);

    await request(app).delete(`/api/campers/${res.body._id}`).expect(204);
  });
});
