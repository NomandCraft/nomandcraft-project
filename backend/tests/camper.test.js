import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import server from '../server.js';

jest.setTimeout(30000);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (server && server.close) {
    await new Promise((resolve) => server.close(resolve));
  }
});

describe('Campers API Integration Tests', () => {
  test('GET /api/campers returns array of campers', async () => {
    const res = await request(app).get('/api/campers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.campers)).toBe(true);
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
    /**
     * @description Creates a camper with the given data
     */

    // Incredible categories and receipt of your ID
    const categoryRes = await request(app)
      .post('/api/categories')
      .send({ name: 'Test Category' });

    const categoryId = categoryRes.body._id; // Now we have the correct Objectid

    const camperData = {
      name: `Test Camper ${Date.now()}`,
      images: ['https://example.com/camper.jpg'],
      category: categoryId, // Now we use the resulting Objectid
      sleepingCapacity: 4,
      price: 25000,
      description: 'A camper for testing purposes',
      features: ['Solar panels', 'Extra battery'],
    };

    // Create camper
    const res = await request(app)
      .post('/api/campers')
      .send(camperData)
      .expect(201);

    // Now check that the camper was created correctly
    expect(res.body.name).toBe(camperData.name);
    expect(res.body.price).toBe(camperData.price);

    //  delete the camper after the test
    await request(app).delete(`/api/campers/${res.body._id}`).expect(204);
  });
});
