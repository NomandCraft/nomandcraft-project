import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import connectDB from '../config/db.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo;

jest.setTimeout(30000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await connectDB(mongo.getUri()); // подключаемся к in-memory Mongo
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
    // 1) создаём категорию
    const categoryRes = await request(app)
      .post('/api/categories')
      .send({ name: `Test Category ${Date.now()}` })
      .expect(201);

    const categoryId = categoryRes.body.id || categoryRes.body._id; // <- важно
    expect(categoryId).toBeTruthy();

    // 2) создаём кемпер
    const camperData = {
      name: `Test Camper ${Date.now()}`,
      images: ['https://example.com/camper.jpg'],
      category: categoryId,
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

    // 3) чистим за собой
    const camperId = res.body.id || res.body._id;
    await request(app).delete(`/api/campers/${camperId}`).expect(204);
  });
});
