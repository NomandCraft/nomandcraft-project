import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import connectDB from '../config/db.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from '../models/category.js';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await connectDB(mongo.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe('Categories API Integration Tests', () => {
  test('GET /api/categories returns array of categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/categories creates category successfully', async () => {
    await Category.deleteMany({ name: /Test Category/i });
    const categoryName = `Test Category ${Date.now()}`;

    const res = await request(app)
      .post('/api/categories')
      .send({ name: categoryName });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toMatch(/Test Category/);
  });

  test('GET /api/categories/:id returns category by id', async () => {
    const cat = await Category.create({ name: 'Test Category' });
    const res = await request(app).get(`/api/categories/${cat._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Category');
  });

  test('PATCH /api/categories/:id updates category by id', async () => {
    await Category.deleteMany({ name: /Test Category/i });
    const cat = await Category.create({ name: `Test Category ${Date.now()}` });

    const res = await request(app)
      .patch(`/api/categories/${cat._id}`)
      .send({ name: `Updated Category ${Date.now()}` });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch(/Updated Category/);
  });

  test('DELETE /api/categories/:id deletes category by id', async () => {
    const cat = await Category.create({ name: `Test Category ${Date.now()}` });
    const res = await request(app).delete(`/api/categories/${cat._id}`);
    expect(res.statusCode).toBe(204);
    const deleted = await Category.findById(cat._id);
    expect(deleted).toBeNull();
  });

  test('GET /api/categories/:id returns 404 for non-existent category', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/categories/${id}`);
    expect(res.statusCode).toBe(404);
  });

  test('PATCH /api/categories/:id returns 404 for non-existent category', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/categories/${id}`)
      .send({ name: 'New Name' });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/categories/:id returns 404 for non-existent category', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/categories/${id}`);
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/categories/:id returns 400 for invalid category id', async () => {
    const res = await request(app).get('/api/categories/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
