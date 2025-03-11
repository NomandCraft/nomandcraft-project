import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Category from '../models/category.js';
import server from '../server.js';

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

describe('Categories API Integration Tests', () => {
  /**
   * @description Check that the GET request for /API /Categories returns an array of categories
   */
  test('GET /api/categories returns array of categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * @description Check that the POST request for /API /Categories creates a category successfully
   */
  test('POST /api/categories creates category successfully', async () => {
    await Category.deleteMany({ name: /Test Category/i }); // Delete duplicates

    const categoryName = `Test Category ${Date.now()}`; // Make the name unique

    const res = await request(app)
      .post('/api/categories')
      .send({ name: categoryName });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toMatch(/Test Category/);
  });

  test('GET /api/categories/:id returns category by id', async () => {
    const category = await Category.create({ name: 'Test Category' });
    const res = await request(app).get(`/api/categories/${category._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Category');
  });

  test('PUT /api/categories/:id updates category by id', async () => {
    await Category.deleteMany({ name: /Test Category/i }); // remove duplicates

    const category = await Category.create({
      name: `Test Category ${Date.now()}`,
    });

    const res = await request(app)
      .put(`/api/categories/${category._id}`)
      .send({ name: `Updated Category ${Date.now()}` });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch(/Updated Category/);
  });

  test('DELETE /api/categories/:id deletes category by id', async () => {
    await Category.deleteMany({ name: /Test Category/i }); // remove duplicates

    const category = await Category.create({
      name: `Test Category ${Date.now()}`,
    });

    const res = await request(app).delete(`/api/categories/${category._id}`);

    expect(res.statusCode).toBe(204);
    const deletedCategory = await Category.findById(category._id);
    expect(deletedCategory).toBeNull();
  });

  test('GET /api/categories/:id returns 404 for non-existent category', async () => {
    const nonExistentId = new mongoose.Types.ObjectId(); // Generate a random valve Objectid
    const res = await request(app).get(`/api/categories/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/categories/:id returns 404 for non-existent category', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/categories/${nonExistentId}`)
      .send({ name: 'New Name' });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/categories/:id returns 404 for non-existent category', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/categories/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/categories/:id returns 400 for invalid category id', async () => {
    const res = await request(app).get('/api/categories/invalid-id'); // Некорректный ID
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/categories/:id returns 400 for invalid category id', async () => {
    const res = await request(app)
      .put('/api/categories/invalid-id')
      .send({ name: 'New Name' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /api/categories/:id returns 400 for invalid category id', async () => {
    const res = await request(app).delete('/api/categories/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
