import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import connectDB from '../config/db.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo;

jest.setTimeout(30000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await connectDB(mongo.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
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
    // Сначала создаём категорию
    const categoryRes = await request(app)
      .post('/api/categories')
      .send({ name: `Test Category ${Date.now()}` });

    const categoryId = categoryRes.body._id;

    const camperData = {
      name: `Test Camper ${Date.now()}`,
      images: ['https://example.com/camper.jpg'],
      category: categoryId,
      sleepingCapacity: 4,
      price: 25000,
      description: 'A camper for testing purposes',
      features: ['Solar panels', 'Extra battery'],
    };

    const res = await request(app).post('/api/campers').send(camperData);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(camperData.name);
    expect(res.body.price).toBe(camperData.price);

    // удаляем
    await request(app).delete(`/api/campers/${res.body._id}`).expect(204);
  });
});
